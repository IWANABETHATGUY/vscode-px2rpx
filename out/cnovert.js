"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require("postcss");
exports.default = postcss.plugin('less-syntax', (option = { type: 'px2rpx' }) => {
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
            rule.walkAtRules(function (atrule) {
                if (atrule.variable === true && atrule.value) {
                    atrule.value = atrule.value.replace(regExp, `$1${after}`);
                }
            });
        });
    };
});
//# sourceMappingURL=cnovert.js.map