const vscode = require('vscode');

function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('vscode-whiteboard.start', () => {
		const panel = vscode.window.createWebviewPanel('vscode-whiteboard', 'VS CODE WHITEBOARD', vscode.ViewColumn.One, {});

		panel.webview.html = getWebviewContent();
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
