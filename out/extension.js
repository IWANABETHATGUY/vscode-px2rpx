'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const postcss = require("postcss");
const lessSyntax = require("postcss-less");
const cnovert_1 = require("./cnovert");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode_1.commands.registerCommand('px2rpx', () => {
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
    return __awaiter(this, void 0, void 0, function* () {
        yield e.edit(function (builder) {
            return __awaiter(this, void 0, void 0, function* () {
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
                let lazyResult = postcss([cnovert_1.default({})]).process(styleContent, {
                    syntax: lessSyntax,
                });
                builder.replace(new vscode_1.Range(startPos, endPos), lazyResult.content);
            });
        });
    });
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map