import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
    template: require('./scriptResultModal.component.pug'),
    styles: [require('./scriptResultModal.component.scss')],
})
export class ScriptResultModalComponent {
    @Input() result: string
    @Input() script: string
    copyText = 'Copy'

    constructor(
        private modalInstance: NgbActiveModal,
    ) { }

    close() {
        this.modalInstance.dismiss()
    }

    async copyResult() {
        await navigator.clipboard.writeText(this.result)
        this.copyText = 'Copied'
        setTimeout(() => {
            this.copyText = 'Copy'
        }, 2000)
    }
} 