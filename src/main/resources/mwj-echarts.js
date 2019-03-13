/**
 * Version: 1.0
 * Author: mengweijin
 * Mail: mengweijin.work@foxmail.com
 *
 * 码云地址：https://gitee.com/mengweijin/mwj-echarts
 *
 * GitHub：https://github.com/mengweijin/mwj-echarts
 *
 * $("#div").mwjECharts(config);

 * The MIT License (MIT)
 *
 * Copyright (c) 2018 mengweijin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
(function ($) {
    $.fn.extend({
        // 初始化页面图表
        mwjECharts : function(setting) {
            // 默认配置
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

            // 用户配置覆盖
            if (setting) {
                // jquery深拷贝setting到config
                $.extend(true, config, setting);
            }

            /**
             * pie chart options
             * config.data = [
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
              ]
             *
             * @param config
             */
            let pieChart = function(config){
                let legend = [];
                let data = [];
                for (let i in config.data){
                    legend.push(config.data[i][config.name_key]);
                    data.push({name: config.data[i][config.name_key], value: config.data[i][config.value_key]});
                }

                let options = {
                    title: { text: config.title},
                    legend: { data: legend, left: 'center', top: 'bottom' },
                    //tooltip: { formatter: "{a} <br/>{b}:{c} ({d}%)" },
                    tooltip: { formatter: function (params) {
                            // 保留两位小数
                            return params.seriesName + ' <br/>' + params.name + ':' + params.value + ' (' +(params.percent - 0).toFixed(2) + '%)'
                        }
                    },
                    toolbox: {
                        show: true,
                        itemSize: 15,
                        itemGap: 15,
                        left: 'right',
                        top: 'top',
                        feature: {
                            saveAsImage: {show: true},
                            dataView: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [{
                        name: config.title,
                        type: "pie",
                        label: {
                            normal:
                                { show: true,
                                    formatter: function (params) {
                                        // 保留两位小数
                                        return params.value + ' (' +(params.percent - 0).toFixed(2) + '%)'
                                    }
                                },
                            emphasis: { show: true, formatter: "{c} ({d}%)" }
                        },
                        labelLine: { normal: { show: true },
                            emphasis: { show: true }
                        },
                        center: ['50%', '50%'],
                        radius: [0, '50%'],
                        data: data
                    }],
                    animation: false
                };

                return options;
            };

            /**
             * bar or line chart
             * config.data = {
                    axisType: 'category',
                    stack: false,
                    legend: ['蒸发量','降水量'],
                    category: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    value: [
                              [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                              [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    ]
               }
             * @param config
             */
            let barOrLineChart = function(config){
                let series = [];

                if(config.data.legend.length > 0) {
                    $.each(config.data.legend, function(index, seriesName) {
                        let seriesItem = {
                            name: seriesName,
                            type: config.type,
                            data: config.data.value[index],
                            // 堆积图配置
                            stack: config.data.stack ? config.title : null,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: config.data.stack ? 'inside' : (config.data.axisType == 'value' ? 'right' : 'top'),
                                        formatter:function(params){
                                            return params.value == 0 ? '' : params.value;
                                        }
                                    }
                                }
                            },
                            barGap: '1%'
                        };
                        series.push(seriesItem);
                    });
                }

                let xAxis = {};
                let yAxis = {};
                if(config.data.axisType == 'value'){
                    xAxis = {type: 'value'};
                    yAxis = {type: 'category', data : config.data.category};
                } else {
                    xAxis = {type: 'category', data : config.data.category};
                    yAxis = {type: 'value'};
                }

                let options = {
                    title: { text: config.title},
                    legend: { data: config.data.legend, left: 'center', top: 'bottom' },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' }
                    },
                    toolbox: {
                        show: true,
                        itemSize: 15,
                        itemGap: 15,
                        left: 'right',
                        top: 'top',
                        feature: {
                            magicType: {show: true, type: ['line', 'bar'] },
                            saveAsImage: {show: true},
                            dataView: {show: true},
                            restore: {show: true}
                        }
                    },
                    xAxis: xAxis,
                    yAxis: yAxis,
                    series: series,
                    animation: false
                };

                return options;
            };

            /**
             * build echarts tree data object
             * @param dataList List<Object>或者List<Map<String, Object>>数据
             * @param rootValue 根值，树图或者级联数据最顶层的数据的value
             * @param nameKey
             * @param valueKey
             * @param parentKey
             * @returns {Array}
             */
            let treeData = function(dataList, rootValue, nameKey, valueKey, parentKey){
                let obj = [];
                for(let i in dataList){
                    let node = dataList[i];
                    if(node[parentKey] == rootValue){
                        let newNode = {
                            name: node[nameKey],
                            value: node[valueKey],
                            children: treeData(dataList, node[valueKey], nameKey, valueKey, parentKey)
                        };
                        obj.push(newNode);
                    }
                }
                return obj;
            };

            /**
             *
             * @param config
             */
            let treeChart = function(config){
                let data = treeData(
                    config.data.list,
                    config.data.rootValue,
                    config.name_key,
                    config.value_key,
                    config.data.parentKey);

                let options = {
                    title: { text: config.title},
                    toolbox: {
                        show: true,
                        itemSize: 15,
                        itemGap: 15,
                        left: 'right',
                        top: 'top',
                        feature: {
                            saveAsImage: {show: true},
                            dataView: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [{
                        type: "tree",
                        label: {
                            normal: {
                                show: true,
                                position: "left",
                                verticalAlign: "middle",
                                align: "right"
                            }
                        },
                        data: data
                    }],
                    animation: false
                };

                return options;
            };

            /**
             * 根据图表类型渲染图表
             * @param chart echarts对象
             * @param config 配置对象
             * @param $this jquery选择器的实例对象（如：$("div")对象）
             */
            let buildCharts = function(chart, config, $this) {
                let options = null;
                switch (config.type) {
                    case "pie":
                        options = pieChart(config);
                        break;
                    case "bar":
                    case "line":
                        options = barOrLineChart(config);
                        break;
                    case "tree":
                        options = treeChart(config);
                        break;
                    default:
                        console.error("The config.type is null or undefined!");
                        break;
                }

                // 默认模板样式
                if(!$.isEmptyObject(options)){
                    chart.setOption(options);
                }

                // 用户自定义样式覆盖
                if(!$.isEmptyObject(config.options)){
                    chart.setOption(config.options);
                }

                // 大小自适应
                $(window).resize(function () {
                    chart.resize(option);
                });

                chart.hideLoading();

                $this.get(0).chart = chart;

                // base64编码的图片
                $this.get(0).chartImage = chart.getDataURL({
                    type: 'png',
                    pixelRatio: 2,
                    backgroundColor: '#FFFFFF',
                    excludeComponents: ['toolbox']
                });
            };

            // 初始化echarts对象，this为jquery对象
            let chart = echarts.init(this.get(0), config.theme);

            // 3.0版本目前只有default一种loading样式
            chart.showLoading();

            let $this = this;

            // 异步加载数据
            if($.isEmptyObject(config.ajax.url)){
                // 本地加载数据
                buildCharts(chart, config, $this);
            } else {
                $.ajax({
                    type: config.ajax.type,
                    url: config.ajax.url,
                    data: config.ajax.params,
                    success: function(result){
                        // 得到数据组
                        config.data = result[config.ajax.data_key];
                        buildCharts(chart, config, $this);
                    },
                    error: function(result){
                        console.log('error: ' + result);
                        chart.hideLoading();
                    }
                });
            }

            return this;
        }
    });
})(jQuery);