# px2rpx

## 目的

由于和自己合作的设计师设计稿总宽度为 750，但是单位使用的是 px，我们虽然可以直接复制设计稿中的样式，但是我们得手动修改 px 为 rpx。可以采用的方法是使用全局替换，但是如果你的某个属性中有 px，就会有误伤的情况。在这样的场景下，决定自己写一个基于使用语法分析将 px 改成 rpx 的工具

## 使用方法

`shift+(cmd|ctrl)`显示所有命令， 输入 `px2rpx` 将  自动寻找 style 标签中的所有声明并转换, `rpx2px`同理
![px2rpx](https://github.com/IWANABETHATGUY/vscode-px2rpx/blob/master/introduction/rpx2px.gif)

如果只想转换部分,可选中需要转换的样式代码，输入`px2rpx`即可
![select-px2rpx](https://github.com/IWANABETHATGUY/vscode-px2rpx/blob/master/introduction/select-px2px.gif)
