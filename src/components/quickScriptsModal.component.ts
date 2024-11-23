import { Component } from '@angular/core'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ConfigService, AppService, BaseTabComponent, SplitTabComponent } from 'terminus-core'
import { QuickScripts, IScriptGroup } from '../api'
import { BaseTerminalTabComponent as TerminalTabComponent } from 'terminus-terminal';
import { ScriptResultModalComponent } from './scriptResultModal.component'


@Component({
    template: require('./quickScriptsModal.component.pug'),
    styles: [require('./quickScriptsModal.component.scss')],
})
export class QuickScriptsModalComponent {
    scripts: QuickScripts[]
    quickScript: string
    childGroups: IScriptGroup[]
    groupCollapsed: { [id: string]: boolean } = {}

    constructor(
        public modalInstance: NgbActiveModal,
        private config: ConfigService,
        private app: AppService,
        private ngbModal: NgbModal,
    ) { }

    ngOnInit() {
        this.scripts = this.config.store.qs.scripts
        this.refresh()
    }

    async quickSend() {
        const result = await this._script(this.app.activeTab, this.quickScript, null)
        console.log("QuickSend result:\n----------------------------------\n" + result);
        const modal = this.ngbModal.open(ScriptResultModalComponent)
        modal.componentInstance.result = result
        this.close()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async _script(tab: BaseTabComponent, script: string, param: string) {
        if (param == "Select text from terminal first") {
            return param
        }
        if (tab instanceof SplitTabComponent) {
            const result = await this._script((tab as SplitTabComponent).getFocusedTab(), script, param)
            return result
        }
        if (tab instanceof TerminalTabComponent) {
            let currentTab = tab as TerminalTabComponent
            if (param == null) {
                param = currentTab.frontend.getSelection()
                if (param == null || param == "" || param.trim() == "") {
                    return "Select text from terminal first"
                }
            }
            param = param.trim()
            const f = new Function("param", script)
            const result = f(param)
            return result
        }
        return null
    }

    close() {
        this.modalInstance.close()
        this.app.activeTab.emitFocused()
    }

    async send(script: QuickScripts) {
        try {
            const result = await this._script(this.app.activeTab, script.text, null)
            console.log("Send result:\n----------------------------------\n" + result);
            const modal = this.ngbModal.open(ScriptResultModalComponent)
            modal.componentInstance.result = result
            this.close()
        } catch (err) {
            const modal = this.ngbModal.open(ScriptResultModalComponent)
            modal.componentInstance.result = `Error: ${err.message}`
            this.close()
        }
    }

    async clickGroup(group: IScriptGroup, event: MouseEvent) {
        if (event.ctrlKey) {
            let result = null;
            for (let script of group.scripts) {
                result = await this._script(this.app.activeTab, script.text, result)
                console.log("Group step result:\n----------------------------------\n" + result);
            }
            console.log("Group result:\n----------------------------------\n" + result);
            const modal = this.ngbModal.open(ScriptResultModalComponent)
            modal.componentInstance.result = result
            this.close()
        }
        else {
            this.groupCollapsed[group.name] = !this.groupCollapsed[group.name]
        }
    }

    refresh() {
        this.childGroups = []

        let scripts = this.scripts
        if (this.quickScript) {
            scripts = scripts.filter(script => (script.name + script.group + script.text).toLowerCase().includes(this.quickScript))
        }

        for (let script of scripts) {
            script.group = script.group || null
            let group = this.childGroups.find(x => x.name === script.group)
            if (!group) {
                group = {
                    name: script.group,
                    scripts: [],
                }
                this.childGroups.push(group)
            }
            group.scripts.push(script)
        }
    }
}
