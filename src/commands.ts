import { commands, window } from 'vscode';
import { Update } from './util';

export let px2rpxCommand = commands.registerCommand('extension.px2rpx', () => {
  let activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  let selection = activeEditor.selection;
  Update(activeEditor, activeEditor.document, 'px2rpx', selection);
});

export let rpx2pxCommand = commands.registerCommand('extension.rpx2px', () => {
  let activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  let selection = activeEditor.selection;
  Update(activeEditor, activeEditor.document, 'rpx2px', selection);
});
