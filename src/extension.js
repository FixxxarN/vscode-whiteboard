const vscode = require('vscode');
const { getNonce } = require('./utils');

function activate(context) {
	let currentPanel = undefined;

	context.subscriptions.push(vscode.commands.registerCommand('vscode-whiteboard.start', () => {
		const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		}
		else {
			currentPanel = vscode.window.createWebviewPanel('vscode-whiteboard', 'Whiteboard', columnToShowIn || vscode.ViewColumn.One, { enableScripts: true, localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'src')] });
		}

		currentPanel.webview.html = getWebviewContent(context.extensionUri, currentPanel);

		currentPanel.onDidDispose(() => {
			currentPanel = undefined;
		}, null, context.subscriptions);
	}))
}

function getWebviewContent(extensionUri, currentPanel) {
	const mainPath = vscode.Uri.joinPath(extensionUri, 'src', 'main.js');

	const mainUri = currentPanel.webview.asWebviewUri(mainPath);

	const stylesPath = vscode.Uri.joinPath(extensionUri, 'src', 'styles.css');

	const stylesUri = currentPanel.webview.asWebviewUri(stylesPath);

	const nonce = getNonce();

	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Visual Studio Code - Whiteboard</title>
			<link href="${stylesUri}" rel="stylesheet">
			<script type="module" nonce="${nonce}" src="${mainUri}" defer></script>
		</head>
		<body>
			<div class="interactives-container">
				<button id="export-button">Export</button>
				<button id="clear-button">Clear</button>
				<button id="line-shape-button">Line</button>
				<button id="rectangle-shape-button">Rectangle</button>
				<button id="circle-shape-button">Circle</button>
			</div>
			<canvas id="whiteboard-static"></canvas>
			<canvas id="whiteboard-dynamic"></canvas>
		</body>
	</html>
	`
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
