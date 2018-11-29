import * as postcss from 'postcss';
import { TransformType } from './type';

interface ExtAtRule extends postcss.AtRule {
  variable?: boolean;
  value?: string;
}
interface Option {
  type: TransformType;
}

export default postcss.plugin(
  'less-syntax',
  (option: Option = { type: 'px2rpx' }) => {
    // Work with options here
    const { type } = option;
    let [before, after] = type.split('2');
    let regExp = new RegExp(`(\\d+)${before}`);
    return root => {
      // Transform CSS AST here
      root.walkRules(rule => {
        // Transform each rule here
        rule.walkDecls(decl => {
          // Transform each property declaration here
          decl.value = decl.value.replace(regExp, `$1${after}`);
        });
        rule.walkAtRules(function(atrule: ExtAtRule): any {
          if (atrule.variable === true && atrule.value) {
            atrule.value = atrule.value.replace(regExp, `$1${after}`);
          }
        });
      });
    };
  },
);
