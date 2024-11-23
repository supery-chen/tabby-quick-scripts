import { Injectable } from '@angular/core'
import { SettingsTabProvider } from 'terminus-settings'

import { QuickScriptsSettingsTabComponent } from './components/quickScriptsSettingsTab.component'

@Injectable()
export class QuickScriptsSettingsTabProvider extends SettingsTabProvider {
    id = 'qs'
    title = 'Quick Scripts'

    getComponentType(): any {
        return QuickScriptsSettingsTabComponent
    }
}
