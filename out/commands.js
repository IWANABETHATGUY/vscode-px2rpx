"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util_1 = require("./util");
exports.px2rpxCommand = vscode_1.commands.registerCommand('extension.px2rpx', () => {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    let selection = activeEditor.selection;
    util_1.Update(activeEditor, activeEditor.document, 'px2rpx', selection);
});
exports.rpx2pxCommand = vscode_1.commands.registerCommand('extension.rpx2px', () => {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    let selection = activeEditor.selection;
    util_1.Update(activeEditor, activeEditor.document, 'rpx2px', selection);
});
//# sourceMappingURL=commands.js.map