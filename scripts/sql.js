// 将日志按行分割
const lines = param.split('\n');

// 筛选出包含Preparing或Parameters的行，并记录类型
const sqlLines = lines.filter(line =>
    line.includes('Preparing:') || line.includes('Parameters:'))
    .map(line => ({
        type: line.includes('Preparing:') ? 'sql' : 'param',
        content: line
    }));

let result = [];
let currentSql = null;

// 遍历处理每一行
for (let i = 0; i < sqlLines.length; i++) {
    const line = sqlLines[i];
    const isLastLine = i === sqlLines.length - 1;

    if (line.type === 'sql') {
        // 如果有上一个未处理的SQL，直接添加到结果中
        if (currentSql) {
            result.push(currentSql);
        }
        currentSql = line.content.match(/Preparing: (.*)/)[1].trim();

        // 如果是最后一行，直接添加SQL
        if (isLastLine) {
            result.push(currentSql);
        }
    } else if (line.type === 'param' && currentSql) {
        // 只有当有对应的SQL语句时才处理参数行
        const paramsMatch = line.content.match(/Parameters: (.*)/)[1];
        const params = paramsMatch.split(', ').map(param => {
            const [value, type] = param.split('(');
            const cleanType = type.replace(')', '');

            if (['String', 'Date', 'Time', 'Timestamp'].includes(cleanType)) {
                return `'${value}'`;
            } else if (cleanType === 'null') {
                return 'NULL';
            } else {
                return value;
            }
        });

        // 替换SQL中的问号
        let finalSql = currentSql;
        params.forEach(param => {
            finalSql = finalSql.replace('?', param);
        });
        if (finalSql?.trim() && !finalSql.trim().endsWith(';')) {
            finalSql += ';'
        }
        result.push(finalSql);
        currentSql = null; // 重置currentSql
    }
}
return result.join('\n');