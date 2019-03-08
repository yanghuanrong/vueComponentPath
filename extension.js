// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const validateComponentName = require('./utils/validateComponentName')
const {readDir} = require('./utils/index')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('extension.vuepath', function () {
		// The code you place here will be executed every time your command is executed
		// console.log(args)
		const selections = vscode.window.activeTextEditor.selections[0]
		const document = vscode.window.activeTextEditor.document
		const word = document.getText(selections)
		const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);

		if(validateComponentName(word)){
			let destPath = readDir(workDir.match(/(\S*)src/g)[0], word);
			console.log(destPath)
			if(destPath){
				vscode.window.showTextDocument(vscode.Uri.file(destPath));
				vscode.window.showInformationMessage('成啦！！！');
			} else {
				vscode.window.showInformationMessage('找不到'+word+'啊， 兄弟');
			}
			
			// new vscode.Location(vscode.Uri.parse(destPath), new vscode.Position(0, 0));
		} else {
			vscode.window.showInformationMessage(word + '标签你心里没点B数吗?');
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
