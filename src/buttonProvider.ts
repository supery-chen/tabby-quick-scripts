import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { HotkeysService, ToolbarButtonProvider, IToolbarButton } from 'terminus-core'
import { QuickScriptsModalComponent as QuickScriptsModalComponent } from './components/quickScriptsModal.component'

@Injectable()
export class ButtonProvider extends ToolbarButtonProvider {
    constructor(
        private ngbModal: NgbModal,
        hotkeys: HotkeysService,
    ) {
        super()
        hotkeys.matchedHotkey.subscribe(async (hotkey) => {
            if (hotkey === 'qs') {
                this.activate()
            }
        })
    }

    activate() {
        this.ngbModal.open(QuickScriptsModalComponent)
    }

    provide(): IToolbarButton[] {
        return [{
            icon: require('./icons/js.svg'),
            weight: 5,
            title: 'Quick scripts',
            touchBarNSImage: 'NSTouchBarComposeTemplate',
            click: async () => {
                this.activate()
            }
        }]
    }
}
