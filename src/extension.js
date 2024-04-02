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
			<button id="line-shape-button">Line</button>
			<button id="rectangle-shape-button">Rectangle</button>
			<button id="circle-shape-button">Circle</button>
			<button id="arrow-shape-button">Arrow</button>
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
