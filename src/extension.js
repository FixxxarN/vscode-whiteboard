const vscode = require('vscode');

function activate(context) {
	let currentPanel = undefined;

	context.subscriptions.push(vscode.commands.registerCommand('vscode-whiteboard.start', () => {
		const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		}
		else {
			currentPanel = vscode.window.createWebviewPanel('vscode-whiteboard', 'Whiteboard', columnToShowIn || vscode.ViewColumn.One, { enableScripts: true, localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'dist')] });
		}

		currentPanel.webview.html = getWebviewContent(context.extensionUri, currentPanel);

		currentPanel.onDidDispose(() => {
			currentPanel = undefined;
		}, null, context.subscriptions);
	}))
}

function getWebviewContent(extensionUri, currentPanel) {
	const mainUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'bundle.js'));

	const stylesUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'styles.css'));

	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Visual Studio Code - Whiteboard</title>
			<link href="${stylesUri}" rel="stylesheet">
			<script>var exports = {};</script>
			</head>
			<body>
			<div class="interactives-container">
			<button id="export-button">Export</button>
			<button id="clear-button">Clear</button>
			<button id="pencil-shape-button">Pencil</button>
			<button id="rectangle-shape-button">Rectangle</button>
			<button id="circle-shape-button">Circle</button>
			<button id="arrow-shape-button">Arrow</button>
			<select id="stroke-width-selector">
			<option value="1">1px</option>
			<option value="2">2px</option>
			<option value="3">3px</option>
			<option value="4">4px</option>
			<option value="5">5px</option>
			<option value="6">6px</option>
			<option value="7">7px</option>
			<option value="8">8px</option>
			<option value="9">9px</option>
			<option value="10">10px</option>
			</select>
			</div>
			<canvas id="whiteboard-static"></canvas>
			<canvas id="whiteboard-dynamic"></canvas>
			<script type="module" src="${mainUri}" defer></script>
			</body>
			</html>
	`
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
