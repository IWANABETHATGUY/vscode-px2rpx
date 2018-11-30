"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const postcss = require("postcss");
const lessSyntax = require("postcss-less");
const cnovert_1 = require("./cnovert");
function Update(e, doc, transType, sel) {
    return __awaiter(this, void 0, void 0, function* () {
        yield e.edit(function (builder) {
            return __awaiter(this, void 0, void 0, function* () {
                // itterate through the selections and convert all text to Lower
                // let txt: string = d.getText(new Range(sel.start, sel.end));
                let content;
                let startPos;
                let endPos;
                let styleStartLine = -1;
                let styleEndLine = -1;
                if (sel.isEmpty) {
                    content = doc.getText();
                }
                else {
                    content = doc.getText(sel);
                }
                let lines = content.split('\n');
                lines.some((line, index) => {
                    if (/<style.*>/.test(line)) {
                        styleStartLine = index;
                    }
                    else if (/<\/style.*>/.test(line)) {
                        styleEndLine = index;
                    }
                    return styleEndLine !== -1 && styleStartLine !== -1;
                });
                if (styleStartLine === -1 && styleEndLine === -1) {
                    startPos = sel.start;
                    endPos = sel.end;
                }
                else if (styleStartLine !== -1 && styleEndLine !== -1) {
                    startPos = new vscode_1.Position(styleStartLine + 1, 0);
                    endPos = new vscode_1.Position(styleEndLine - 1, lines[styleEndLine - 1].length);
                }
                else if (styleStartLine === -1) {
                    startPos = sel.start;
                    endPos = new vscode_1.Position(styleEndLine - 1, lines[styleEndLine - 1].length);
                }
                else {
                    startPos = new vscode_1.Position(styleStartLine + 1, 0);
                    endPos = sel.end;
                }
                let styleContent = doc.getText(new vscode_1.Range(startPos, endPos));
                let lazyResult = postcss([
                    cnovert_1.default({
                        type: transType,
                    }),
                ]).process(styleContent, {
                    syntax: lessSyntax,
                });
                builder.replace(new vscode_1.Range(startPos, endPos), lazyResult.content);
            });
        });
    });
}
exports.Update = Update;
//# sourceMappingURL=util.js.map