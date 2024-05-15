const vscode = require('vscode');

function activate(context) {
	let currentPanel = undefined;

	context.subscriptions.push(vscode.commands.registerCommand('vscode-whiteboard.start', () => {
		const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		}
		else {
			currentPanel = vscode.window.createWebviewPanel('vscode-whiteboard', 'Whiteboard', columnToShowIn || vscode.ViewColumn.One, { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'dist')] });
		}

		currentPanel.webview.html = getWebviewContent(context.extensionUri, currentPanel);

		currentPanel.onDidDispose(() => {
			currentPanel = undefined;
		}, null, context.subscriptions);
	}))
}

function getWebviewContent(extensionUri, currentPanel) {
	const mainUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'bundle.js'));

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Visual Studio Code - Whiteboard</title>
				<script>var exports = {};</script>
				<script type="module" src="${mainUri}"></script>
				<style>
				body {
					user-select: none;
					display: flex;
					padding: 0px;
					margin: 0px;
					height: 100vh;
					width: 100vw;
				}
				
				#root {
					display: flex;
					width: 100%;
					height: 100%;
				}				
				</style>
			</head>
			<body>
				<div id="root"></div>
			</body>
		</html>
	`
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
