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

		const selections = vscode.window.activeTextEditor.selections[0]
		const document = vscode.window.activeTextEditor.document
		const word = document.getText(selections)
		const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);

		if(validateComponentName(word)){
			let destPath = readDir(workDir.match(/(\S*)src/g)[0], word);
			
			if(destPath){
				vscode.window.showTextDocument(vscode.Uri.file(destPath));
				vscode.window.showInformationMessage('成啦！！！');
			} else {
				vscode.window.showInformationMessage('我找不到'+word+'啊, 兄弟');
			}
		} else {
			vscode.window.showInformationMessage(word + '标签没点B数吗?');
		}
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
