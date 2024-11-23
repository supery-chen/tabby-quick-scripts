import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToolbarButtonProvider, ConfigProvider } from 'terminus-core'
import TerminusCoreModule from 'terminus-core'
import { SettingsTabProvider } from 'terminus-settings'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EditScriptModalComponent } from './components/editScriptModal.component'
import { QuickScriptsModalComponent } from './components/quickScriptsModal.component'
import { QuickScriptsSettingsTabComponent as QuickScriptsSettingsTabComponent } from './components/quickScriptsSettingsTab.component'
import { PromptModalComponent } from './components/promptModal.component'
import { ScriptResultModalComponent } from './components/scriptResultModal.component'

import { ButtonProvider } from './buttonProvider'
import { QuickScriptsConfigProvider } from './config'
import { QuickScriptsSettingsTabProvider as QuickScriptsSettingsTabProvider } from './settings'

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        TerminusCoreModule,
        DragDropModule,
    ],
    providers: [
        { provide: ToolbarButtonProvider, useClass: ButtonProvider, multi: true },
        { provide: ConfigProvider, useClass: QuickScriptsConfigProvider, multi: true },
        { provide: SettingsTabProvider, useClass: QuickScriptsSettingsTabProvider, multi: true },
    ],
    entryComponents: [
        PromptModalComponent,
        EditScriptModalComponent,
        QuickScriptsModalComponent,
        QuickScriptsSettingsTabComponent,
        ScriptResultModalComponent,
    ],
    declarations: [
        PromptModalComponent,
        EditScriptModalComponent,
        QuickScriptsModalComponent,
        QuickScriptsSettingsTabComponent,
        ScriptResultModalComponent,
    ],
})
export default class QuickScriptsModule { }
