# mwj-echarts

#### 介绍
简单封装的jquery百度echarts组件库扩展，支持从服务器异步加载或从本地加载数据。
目前支持以下类型图表：

类别|描述
------|------
pie                           |   饼图
bar_vertical                  |   垂直柱状图
line_vertical                 |   折线图，横向
bar_horizontal                |   水平柱状图
line_horizontal               |   折线图，竖向
bar_stack_vertical            |   垂直堆积柱状图
line_stack_vertical           |   折线图，横向，多条
bar_stack_horizontal          |   水平堆积柱状图
line_stack_horizontal         |   折线图，竖向，多条
tree                          |   树图

```
配置基本参数说明：
let config = {
    /**
     * 图表类型：
     * pie                              饼图
     * bar_vertical                     垂直柱状图
     * line_vertical                    折线图，横向
     * bar_horizontal                   水平柱状图
     * line_horizontal                  折线图，竖向
     * bar_stack_vertical               垂直堆积柱状图
     * line_stack_vertical              折线图，横向，多条
     * bar_stack_horizontal             水平堆积柱状图
     * line_stack_horizontal            折线图，竖向，多条
     * tree                             树图
     */
    type: null,
    title: "",              // 图表标题
    /**
     * 主题，如：wonderland, 需要线引入主题wonderland.js文件
     * 可以自定义主题，地址：https://echarts.baidu.com/theme-builder/
     */
    theme: null,
    options: {},            // 用户自定义echarts option，具体参考echarts官方文档
    data: null,             // 根据图表类型的不同，会返回不同结构的数据，具体参考各种图的demo
    ajax: {
        url: "",            // 异步加载数据url
        params: {},         // 请求参数
        type: "GET",        // 请求类型
        data_key: "data"    // 请求成功存放数据的集合的变量名
    },
    name_key: "name",
    value_key: "value"
};

使用方式：
let $demo = $("#demo")
    .css("width", width)
    .css("height", height)
    .css("display", "inline-block")
    .css("margin-bottom", "30px")
    .mwjECharts(config);

    // 获取echarts图表对象
    $demo.get(0).chart;
    // 获取base64编码的图片数据
    $demo.get(0).chartImage;
```

#### 使用说明

参考根目录下的demo文件夹

注：默认如果存在config.ajax.url不为空，则从该url异步加载数据，否则从本地data加载数据。

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
