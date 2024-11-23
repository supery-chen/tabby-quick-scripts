# tabby-quick-scripts

A Quick Scripts plugin for Tabby terminal.

## Shortcuts

The default shortcut for opening the Quick Scripts menu is `Alt+S` (Windows).

## Usage

### Adding a Script

1. Open Settings and select `Quick Scripts`
2. Click the `Add script` button and configure:
   - Name
   - Script (JavaScript only)
   - Group
   
> 🎈 Example script:
> ```js
> // 'param' is the text selected in the terminal
> return param.toUpperCase();
> ```
3. Click the `Save` button

### Running a Script

1. Select text in the terminal
2. Open the Quick Scripts menu using `Alt+S`
   > Alternatively, click the ![Js](src/icons/js.svg) icon next to the settings button
3. Click a script to run it

### Running a Script Group

1. Select text in the terminal
2. Open the Quick Scripts menu using `Alt+S`
   > Alternatively, click the `Js` icon in the tab header
3. Hold `Ctrl` and click a group name to run all scripts in that group sequentially

## How It Works

The plugin:
- Takes the selected terminal text as input
- Passes it through the selected script(s)
- Displays the result in a toast notification
- Provides an option to copy the result to clipboard

When running a script group, each script's output becomes the input for the next script in sequence.

## Acknowledgments

This plugin is based on [@terminus-quick-cmds](https://github.com/minyoad/terminus-quick-cmds). Thanks to their original work.