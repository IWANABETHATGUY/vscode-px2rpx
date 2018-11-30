// 'use strict';
import { ExtensionContext } from 'vscode';
import { px2rpxCommand, rpx2pxCommand } from './commands';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  context.subscriptions.push(px2rpxCommand);
  context.subscriptions.push(rpx2pxCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
