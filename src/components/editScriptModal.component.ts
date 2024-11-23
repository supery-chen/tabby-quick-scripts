import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { QuickScripts } from '../api'

@Component({
    template: require('./editScriptModal.component.pug'),
})
export class EditScriptModalComponent {
    script: QuickScripts

    constructor(
        private modalInstance: NgbActiveModal,
    ) {
    }

    save() {
        this.modalInstance.close(this.script)
    }

    cancel() {
        this.modalInstance.dismiss()
    }
}
