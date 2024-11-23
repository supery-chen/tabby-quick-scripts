import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ConfigService } from 'terminus-core'
import { QuickScripts, IScriptGroup } from '../api'
import { EditScriptModalComponent } from './editScriptModal.component'
import { PromptModalComponent } from './promptModal.component'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    template: require('./quickScriptsSettingsTab.component.pug'),
})
export class QuickScriptsSettingsTabComponent {
    quickScript: string
    scripts: QuickScripts[]
    childGroups: IScriptGroup[]
    groupCollapsed: { [id: string]: boolean } = {}

    constructor(
        public config: ConfigService,
        private ngbModal: NgbModal,
    ) {
        this.scripts = this.config.store.qs.scripts
        this.refresh()
    }

    createScript() {
        let script: QuickScripts = {
            name: '',
            text: ''
        }

        let modal = this.ngbModal.open(EditScriptModalComponent)
        modal.componentInstance.script = script
        modal.result.then(result => {
            this.scripts.push(result)
            this.config.store.qs.scripts = this.scripts
            this.config.save()
            this.refresh()
        })
    }

    editScript(script: QuickScripts) {
        let modal = this.ngbModal.open(EditScriptModalComponent)
        modal.componentInstance.script = Object.assign({}, script)
        modal.result.then(result => {
            Object.assign(script, result)
            this.config.save()
            this.refresh()
        })
    }

    deleteScript(script: QuickScripts) {
        if (confirm(`Delete "${script.name}"?`)) {
            this.scripts = this.scripts.filter(x => x !== script)
            this.config.store.qs.scripts = this.scripts
            this.config.save()
            this.refresh()
        }
    }

    editGroup(group: IScriptGroup) {
        let modal = this.ngbModal.open(PromptModalComponent)
        modal.componentInstance.prompt = 'New group name'
        modal.componentInstance.value = group.name
        modal.result.then(result => {
            if (result) {
                for (let connection of this.scripts.filter(x => x.group === group.name)) {
                    connection.group = result
                }
                this.config.save()
                this.refresh()
            }
        })
    }

    deleteGroup(group: IScriptGroup) {
        if (confirm(`Delete "${group}"?`)) {
            for (let script of this.scripts.filter(x => x.group === group.name)) {
                script.group = null
            }
            this.config.save()
            this.refresh()
        }
    }

    cancelFilter() {
        this.quickScript = ''
        this.refresh()
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

    drop(event: CdkDragDrop<QuickScripts[]>, group: IScriptGroup) {
        moveItemInArray(group.scripts, event.previousIndex, event.currentIndex);

        this.scripts = this.childGroups.reduce((acc, group) => {
            return acc.concat(group.scripts);
        }, []);

        this.config.store.qs.scripts = this.scripts;
        this.config.save();
    }

}
