# mwj-echarts

#### 介绍
简单封装的百度echarts组件库扩展，支持从服务器异步加载或从本地加载数据。

依赖集成：jquery 3.3.1、echarts 4.1.0-release。

目前支持以下类型图表：

类别|描述
------|------
pie             |   饼图
bar             |   柱状图（组合图、堆积图）
line            |   折线图
tree            |   树图

## 效果图
<table>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/102949_8c48d8a0_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103048_df3661e2_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103121_8782b7ec_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103213_1bece630_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103251_eec42de1_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103313_4c039ec3_1644072.png"/></td>   
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0312/103339_c702917e_1644072.png"/></td>   
    </tr>
</table>

#### 配置参数说明
```
let config = {
    /**
     * 图表类型：
     * pie            饼图
     * bar            柱状图（组合图、堆积图）
     * line           折线图
     * tree           树图
     */
    type: null,
    title: "",              // 图表标题
    /**
     * 主题，如：wonderland, 需要线引入主题wonderland.js文件
     * 可以自定义主题，地址：https://echarts.baidu.com/theme-builder/
     */
    theme: null,
    options: {},            // 用户自定义echarts option，具体参考echarts官方文档
    data: null,             // 根据图表类型的不同，会返回不同结构的数据，具体参考各种图的demo（https://gitee.com/mengweijin/mwj-echarts-demo）
    ajax: {
        url: "",            // 异步加载数据url
        params: {},         // 请求参数
        type: "GET",        // 请求类型
        data_key: "data"    // 请求成功存放数据的集合的变量名
    },
    name_key: "name",
    value_key: "value"
};

注：默认如果存在config.ajax.url不为空，则从该url异步加载数据，否则从本地data加载数据。

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
1、将本项目使用maven打包成jar，并安装到自己本地的maven仓库或者私服，然后添加到自己的工程里。如下：
```
<dependency>
    <groupId>com.mwj</groupId>
    <artifactId>mwj-echarts</artifactId>
    <version>1.0</version>
</dependency>
```

2、在页面按导入相关js文件，mwj-echarts.js放在最后导入，使用方法和webjars相同（mwj-echarts.jar的webjar已经包含jquery, echarts, echarts主题文件，所以可以直接从mwj-echarts.jar的webjar中引入，如果不想使用自带的jquery版本，在maven中排除依赖，然后引入自己的jquery即可，需要注意引入顺序。）。如下：
```
<script th:src="@{/webjars/jquery/jquery.min.js}"></script>
<script th:src="@{/webjars/echarts/dist/echarts.min.js}"></script>
<!-- echarts主题可按需加载，非必须。 -->
<script th:src="@{/webjars/mwj-echarts/theme/wonderland.js}"></script>
<script th:src="@{/webjars/mwj-echarts/mwj-echarts.js}"></script>
```

3、饼图使用示例（其他图表使用详情参考：https://gitee.com/mengweijin/mwj-echarts-demo）：
```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="demo"></div>
    <div id="demoAjax"></div>

    <div th:include="include::footer"></div>

    <script>
        let width = $('body').width()/2-10;
        let height = 430;

        // 本地加载数据方式
        let config = {
            type: "pie",
            title: "本地加载饼图",
            theme: "wonderland",
            options: {},
            data: [
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}],
            name_key: "name",
            value_key: "value"
        };


        let demo = $("#demo")
            .css("width", width)
            .css("height", height)
            .css("display", "inline-block")
            .css("margin-bottom", "30px")
            .mwjECharts(config);

        console.log(demo.get(0).chart);
        console.log(demo.get(0).chartImage);

        // 从服务端异步加载数据方式
        let ajaxConfig = {
            type: "pie",
            title: "异步加载饼图",
            theme: "wonderland",
            options: {},
            data: null,
            ajax: {
                url: "/demo/pieData",
                params: {},
                type: "GET",
                data_key: "data"
            },
            name_key: "name",
            value_key: "value"
        };
        let demoAjax = $("#demoAjax")
            .css("width", width)
            .css("height", height)
            .css("display", "inline-block")
            .css("margin-bottom", "30px")
            .mwjECharts(ajaxConfig);

    </script>
</body>
</html>
```


#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
