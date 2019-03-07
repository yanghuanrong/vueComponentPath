// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const path = require('path');
const validateComponentName = require('./utils/validateComponentName')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('进来了');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.vuepath', function (args) {
		// The code you place here will be executed every time your command is executed
		// console.log(args)
		let selections = vscode.window.activeTextEditor.selections[0]
		let document = vscode.window.activeTextEditor.document
		let word = document.getText(selections)

		if(validateComponentName(word)){
			vscode.window.showInformationMessage('大佬你选中了'+ word);
		} else {
			vscode.window.showInformationMessage('原生标签，你选给鸡');
		}
		// Display a message box to the user
	});
	
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
