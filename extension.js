const vscode = require('vscode');

function activate(context) {
	let currentPanel = undefined;

	context.subscriptions.push(vscode.commands.registerCommand('vscode-whiteboard.start', () => {
		const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		}
		else {
			currentPanel = vscode.window.createWebviewPanel('vscode-whiteboard', 'VS CODE WHITEBOARD', columnToShowIn || vscode.ViewColumn.One, {});
		}

		currentPanel.webview.html = getWebviewContent();
	}))
}

function getWebviewContent() {
	return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>VS CODE WHITEBOARD</title>
	</head>
	<body>
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
