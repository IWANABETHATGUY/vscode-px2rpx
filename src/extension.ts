// 'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
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
import { TransformType } from './type';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  let px2rpxCommand = commands.registerCommand('extension.px2rpx', () => {
    let activeEditor = window.activeTextEditor;
    if (!activeEditor) {
      return;
    }
    Update(activeEditor, activeEditor.document, 'px2rpx');
  });
  let rpx2pxCommand = commands.registerCommand('extension.rpx2px', () => {
    let activeEditor = window.activeTextEditor;
    if (!activeEditor) {
      return;
    }

    Update(activeEditor, activeEditor.document, 'rpx2px');
  });
  context.subscriptions.push(px2rpxCommand);
  context.subscriptions.push(rpx2pxCommand);
}

async function Update(
  e: TextEditor,
  doc: TextDocument,
  transType: TransformType,
) {
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

    let lazyResult = postcss([
      lessConvert({
        type: transType,
      }),
    ]).process(styleContent, {
      syntax: lessSyntax,
    });
    builder.replace(new Range(startPos, endPos), lazyResult.content);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
