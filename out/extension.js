'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const postcss = require("postcss");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode_1.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        let activeEditor = vscode_1.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        let selection = activeEditor.selection;
        Update(activeEditor, activeEditor.document, selection);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function Update(e, doc, sel) {
    e.edit(function (edit) {
        // itterate through the selections and convert all text to Lower
        // let txt: string = d.getText(new Range(sel.start, sel.end));
        let content = doc.getText();
        let lines = content.split('\n');
        let styleStartLine = -1;
        let styleEndLine = -1;
        lines.some((line, index) => {
            if (/<style.*>/.test(line)) {
                styleStartLine = index;
            }
            else if (/<\/style.*>/.test(line)) {
                styleEndLine = index;
            }
            return styleEndLine !== -1 && styleStartLine !== -1;
        });
        let startPos = new vscode_1.Position(styleStartLine + 1, 0);
        let endPos = new vscode_1.Position(styleEndLine - 1, lines[styleEndLine - 1].length);
        let styleContent = doc.getText(new vscode_1.Range(startPos, endPos));
        let ast = postcss.parse(styleContent);
        walk(ast);
        edit.replace(new vscode_1.Range(startPos, endPos), ast.toString());
    });
}
function walk(root) {
    root.walkRules(rule => {
        // Transform each rule here
        rule.walkDecls(decl => {
            // Transform each property declaration here
            decl.value = decl.value.replace(/(\d+)px/, '$1rpx');
        });
    });
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map