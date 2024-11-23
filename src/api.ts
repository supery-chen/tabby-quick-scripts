export interface QuickScripts {
    name: string
    text: string
    group?: string
}

export interface IScriptGroup {
    name: string
    scripts: QuickScripts[]
}
