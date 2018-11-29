'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
  Selection,
  ExtensionContext,
  window,
  TextEditor,
  TextDocument,
  Range,
  Position,
  TextEditorEdit,
} from 'vscode';
import * as postcss from 'postcss';
import * as lessSyntax from 'postcss-less';
import lessConvert from './cnovert';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = commands.registerCommand('extension.px2rpx', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    let activeEditor = window.activeTextEditor;
    if (!activeEditor) {
      return;
    }
    let selection: Selection = activeEditor.selection;
    Update(activeEditor, activeEditor.document, selection);
  });

  context.subscriptions.push(disposable);
}

async function Update(e: TextEditor, doc: TextDocument, sel: Selection) {
  await e.edit(async function(builder: TextEditorEdit) {
    // itterate through the selections and convert all text to Lower
    // let txt: string = d.getText(new Range(sel.start, sel.end));
    let content: string = doc.getText();
    let lines: string[] = content.split('\n');
    let styleStartLine: number = -1;
    let styleEndLine: number = -1;
    lines.some((line, index) => {
      if (/<style.*>/.test(line)) {
        styleStartLine = index;
      } else if (/<\/style.*>/.test(line)) {
        styleEndLine = index;
      }
      return styleEndLine !== -1 && styleStartLine !== -1;
    });
    let startPos = new Position(styleStartLine + 1, 0);
    let endPos = new Position(styleEndLine - 1, lines[styleEndLine - 1].length);
    let styleContent = doc.getText(new Range(startPos, endPos));

    let lazyResult = postcss([lessConvert({})]).process(styleContent, {
      syntax: lessSyntax,
    });
    builder.replace(new Range(startPos, endPos), lazyResult.content);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
