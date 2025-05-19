const sound = require('sound-play');
const path = require("path");
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('the_code_hater.playSound', function () {
		vscode.window.showInformationMessage('Broken Code activated!');
	});

	vscode.workspace.onDidSaveTextDocument((document) => {
		const diagnostics = vscode.languages.getDiagnostics(document.uri);

        const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);

		if(hasErrors){
			let number = Math.ceil(Math.random() * 6)
			sound.play(path.join(__dirname, "media/" + number + ".mp3"))
		}
    });

	context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
