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
		console.log(selections)
		console.log(document.getText())

		// Display a message box to the user
		vscode.window.showInformationMessage('123123');
	});
	
	let vuetag = vscode.languages.registerDefinitionProvider(['vue'], {
		provideDefinition(document, position) {
			console.log(document.getWordRangeAtPosition(position))
			const fileName    = document.fileName;
			const workDir     = path.dirname(fileName);
			const word        = document.getText(document.getWordRangeAtPosition(position));
			// console.log('====== 进入 provideDefinition 方法 ======');
			// console.log('fileName: ' + fileName); // 当前文件完整路径
			// console.log('workDir: ' + workDir); // 当前文件所在目录
			// console.log('word: ' + word)
	
			if(validateComponentName(word)){
			}
		}
	})
	
	context.subscriptions.push(disposable,vuetag);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
