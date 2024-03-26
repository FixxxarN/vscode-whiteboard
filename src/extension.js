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
			currentPanel = vscode.window.createWebviewPanel('vscode-whiteboard', 'Whiteboard', columnToShowIn || vscode.ViewColumn.One, { enableScripts: true, localResourceRoots: [context.extensionUri] });
		}

		currentPanel.webview.html = getWebviewContent(context.extensionUri, currentPanel);

		currentPanel.onDidDispose(() => {
			currentPanel = undefined;
		}, null, context.subscriptions);
	}))
}

function getWebviewContent(extensionUri, currentPanel) {
	const mainUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'main.js'));
	const whiteboardUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'whiteboard.js'));
	const stylesUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'styles.css'));

	const nonce = getNonce();

	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Visual Studio Code - Whiteboard</title>
			<link href="${stylesUri}" rel="stylesheet">
			<script nonce="${nonce}" src="${whiteboardUri}"></script>
			<script nonce="${nonce}" src="${mainUri}" defer></script>
		</head>
		<body>
			<div class="interactives-container">
				<button id="export-button">Export</button>
				<button id="clear-button">Clear</button>
			</div>
			<canvas id="whiteboard"></canvas>
		</body>
	</html>
	`
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
