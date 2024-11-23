import { ConfigProvider } from 'terminus-core'

export class QuickScriptsConfigProvider extends ConfigProvider {
    defaults = {
        qs: {
            scripts: []
        },
        hotkeys: {
            'qs': [
                'Alt-S',
            ],
        },
    }

    platformDefaults = {}
}
