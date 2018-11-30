import {
  TextEditor,
  TextDocument,
  Range,
  Position,
  TextEditorEdit,
  Selection,
} from 'vscode';
import { TransformType } from './type';
import * as postcss from 'postcss';
import * as lessSyntax from 'postcss-less';
import lessConvert from './cnovert';

export async function Update(
  e: TextEditor,
  doc: TextDocument,
  transType: TransformType,
  sel: Selection,
) {
  await e.edit(async function(builder: TextEditorEdit) {
    // itterate through the selections and convert all text to Lower
    // let txt: string = d.getText(new Range(sel.start, sel.end));
    let content: string;
    let startPos: Position;
    let endPos: Position;
    let styleStartLine: number = -1;
    let styleEndLine: number = -1;
    if (sel.isEmpty) {
      content = doc.getText();
    } else {
      content = doc.getText(sel);
    }
    let lines: string[] = content.split('\n');

    lines.some((line, index) => {
      if (/<style.*>/.test(line)) {
        styleStartLine = index;
      } else if (/<\/style.*>/.test(line)) {
        styleEndLine = index;
      }
      return styleEndLine !== -1 && styleStartLine !== -1;
    });

    if (styleStartLine === -1 && styleEndLine === -1) {
      startPos = sel.start;
      endPos = sel.end;
    } else if (styleStartLine !== -1 && styleEndLine !== -1) {
      startPos = new Position(styleStartLine + 1, 0);
      endPos = new Position(styleEndLine - 1, lines[styleEndLine - 1].length);
    } else if (styleStartLine === -1) {
      startPos = sel.start;
      endPos = new Position(styleEndLine - 1, lines[styleEndLine - 1].length);
    } else {
      startPos = new Position(styleStartLine + 1, 0);
      endPos = sel.end;
    }
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
