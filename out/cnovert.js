"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require("postcss");
exports.default = postcss.plugin('less-syntax', (options = {}) => {
    // Work with options here
    return root => {
        // Transform CSS AST here
        root.walkRules(rule => {
            // Transform each rule here
            rule.walkDecls(decl => {
                // Transform each property declaration here
                decl.value = decl.value.replace(/(\d+)px/, '$1rpx');
            });
            rule.walkAtRules(function (atrule) {
                if (atrule.variable === true && atrule.value) {
                    atrule.value = atrule.value.replace(/(\d+)px/, '$1rpx');
                }
            });
        });
    };
});
//# sourceMappingURL=cnovert.js.map