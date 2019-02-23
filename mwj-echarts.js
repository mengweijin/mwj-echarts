/**
 * Version: 1.0
 * Author: mengweijin
 *
 * $("#div").mwjECharts(config);
 */
(function ($) {
    $.fn.extend({

        defaultChartConfig : function () {
            return {
                type: "pie",                    // 图表类型
                title: "",                      // 标题
                theme: "",                      // 主题，如：wonderland, 需要线引入主题js文件
                url: "",                        // 异步加载数据url
                request_params: {},             // 请求参数
                request_type: "GET",            // 请求类型
                success_key: "code",            // 请求成功的key
                success_value: 0,               // 请求成功的值
                data_key: "data",               // 请求成功存放数据的集合的变量名
                data_pie: [],                   // 数据
                data_bar: {
                    legend: [],                 // 图例组
                    xAxisType: "category",      // xAxis的type的类别，可选category或者value, 选category为垂直柱状图
                    category: [],               // 类别名称数组
                    value: []                   // 各类别对应值数组
                },                              // 数据
                name_key: "name",
                value_key: "value",
                options : {}                    // 自定义echarts option
            };

        },

        // 初始化页面图表
        mwjECharts : function(config){
            let $this = this;

            let setting = this.defaultChartConfig();
            if(!config){
                config = setting;
            } else {
                if($.isEmptyObject(config.type))       {config.type        = setting.type;}
                if($.isEmptyObject(config.title))      {config.title       = setting.title;}
                if($.isEmptyObject(config.theme))      {config.theme       = setting.theme;}
                if($.isEmptyObject(config.data_pie))   {config.data_pie    = setting.data_pie;}
                if($.isEmptyObject(config.name_key))   {config.name_key    = setting.name_key;}
                if($.isEmptyObject(config.value_key))  {config.value_key   = setting.value_key;}
                if($.isEmptyObject(config.options))    {config.options     = setting.options;}

                if(!$.isEmptyObject(config.url)){
                    if($.isEmptyObject(config.request_params))   {config.request_params  = setting.request_params;}
                    if($.isEmptyObject(config.request_type))     {config.request_type    = setting.request_type;}
                    if($.isEmptyObject(config.success_key))      {config.success_key     = setting.success_key;}
                    if($.isEmptyObject(config.success_value))    {config.success_value   = setting.success_value;}
                    if($.isEmptyObject(config.data_key))       {config.data_key      = setting.data_key;}
                }

                if($.isEmptyObject(config.data_bar))    {config.data_bar     = setting.data_bar;}
                if($.isEmptyObject(config.data_bar.legend))    {config.data_bar.legend     = setting.data_bar.legend;}
                if($.isEmptyObject(config.data_bar.xAxisType))    {config.data_bar.xAxisType     = setting.data_bar.xAxisType;}
                if($.isEmptyObject(config.data_bar.category))    {config.data_bar.category     = setting.data_bar.category;}
                if($.isEmptyObject(config.data_bar.value))    {config.data_bar.value     = setting.data_bar.value;}
            }

            let chart = echarts.init(this.get(0), config.theme);

            chart.showLoading(); // 3.0版本目前只有default一种loading样式

            // 异步加载数据
            if(!$.isEmptyObject(config.url)){

                $.ajax({
                    type: config.request_type,
                    url: config.url,
                    data: config.request_params,
                    success: function(result){
                        if(typeof result == 'string'){
                            result = eval('(' + result + ')');
                            if(typeof result == 'string')result = eval('(' + result + ')');
                        }

                        // 验证数据格式
                        if( config.success_key &&
                            (typeof result[config.success_key] == 'undefined'
                                || result[config.success_key] != config.success_value) ){
                            console.log('返回的数据格式不正确！' + result);
                            return false;
                        }

                        // 得到数据组
                        //config.data = eval('(result.' + config.data_key + ')');
                        config.data_pie = result[config.data_key];

                        $this.buildChartOptions(chart, config);
                    },
                    error: function(result){
                        console.log('error:' + result);
                    }
                });

            } else {
                // 本地加载数据
                this.buildChartOptions(chart, config);
            }

            this.get(0).chart = chart;
            return this;
        },

        buildChartOptions: function (chart, config) {
            let templateOptions;
            let legend = [];
            let series = [];
            switch (config.type) {
                // 饼图
                case 'pie':
                    for (let i in config.data_pie){
                        legend.push(config.data_pie[i][config.name_key]);
                        series.push({name: config.data_pie[i][config.name_key], value: config.data_pie[i][config.value_key]});
                    }

                    templateOptions = {
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
                            type: config.type,
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
                            data: series
                        }],
                        animation: false
                    };
                    break;
                case 'line':		// 折线
                case 'bar':         // 柱状图
                    if(config.data_bar.legend.length > 0) {
                        $.each(config.data_bar.legend, function(index, seriesName) {
                            let seriesItem = {
                                name: seriesName,
                                type: config.type,
                                data:config.data_bar.value[index],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter:function(params){
                                                if(params.value === 0){
                                                    return '';
                                                } else {
                                                    return params.value;
                                                }
                                            }
                                        }
                                    }
                                },
                                barGap: '1%'
                            };
                            series.push(seriesItem);
                        });
                    }

                    // 根据xAxisType判断xAxis和yAxis的类型和数据
                    let xAxis = [];
                    let yAxis = [];
                    if(config.data_bar.xAxisType === "value") {
                        xAxis.push({type: 'value'});
                        yAxis.push({type: 'category', data : config.data_bar.category});
                    } else {
                        xAxis.push({type: 'category', data : config.data_bar.category});
                        yAxis.push({type: 'value'});
                    }

                    templateOptions = {
                        title: { text: config.title},
                        legend: { data: legend, left: 'center', top: 'bottom' },
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

                    break;
                default:
                    break;
            }

            // 默认模板样式
            if(!$.isEmptyObject(templateOptions)){
                chart.setOption(templateOptions);
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

        },

        /**
         * 导出为base64位编码的png图片
         * @returns {string|*}
         */
        exportToPng: function(){
            return this.get(0).chart.getDataURL({type: 'png',
                pixelRatio: 2,
                backgroundColor: '#FFFFFF',
                excludeComponents: ['toolbox']});
        }

    });
})(jQuery);