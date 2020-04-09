
# Stylus

- [Stylus](http://stylus-lang.com/)
- [Stylus 中文文档](https://www.zhangxinxu.com/jq/stylus/)
- [Stylus Demo](http://stylus-lang.com/try.html)

> 根据设计规范预先设置好
> 如: 颜色 按钮 边距等...
> 请查看相对应的文件

## 说明

根据模块进行划分相对应的文件
每个`模块`页面名与CSS名相对应
使用:

```css
  @import "~@/stylus/gas/index"
```

## 目录结构

```bash
./src/stylus
├── README.md               # 自序
├── account                 # 我的模块
├── base                    # 基础样式库
│   ├── index.styl
│   ├── variable.styl       # 变量
│   └── mixins.styl         # 混合
├── gas                     # 加油模块
│   └── index.styl
├── global.styl             # 全局样式
└── main.styl               # 基础样式
```

## 使用基本规范

### 空格与缩进

缩进已`2个空格`为准，删除不必要的尾随空格及`分号`

### 连写

必要时，如果有很多选择器拥有同样的样式，则可以把这些选择器写在一起并以 `,` 隔开。

### 嵌套

选择器嵌套只在有必要时用，由于使用它们带来的性能损失，也应该谨慎使用直接后代。
当发生大量嵌套时，嵌套会导致文件体积过大。

任何选择器都应该在它们之前有一个换行符

> 后续继续完善
