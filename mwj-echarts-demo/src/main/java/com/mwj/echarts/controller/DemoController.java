package com.mwj.echarts.controller;

import com.mwj.echarts.ChartResult;
import com.mwj.echarts.impl.BarData;
import com.mwj.echarts.impl.GaugeData;
import com.mwj.echarts.impl.PieData;
import com.mwj.echarts.impl.TreeData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * @author Meng Wei Jin
 * @description
 **/
@Controller
@RequestMapping("/demo")
public class DemoController {

    @GetMapping("/pie")
    public String pie(){
        return "demo/pie";
    }

    @GetMapping("/tree")
    public String tree(){
        return "demo/tree";
    }

    @GetMapping("/barLine")
    public String barLine(){
        return "demo/bar_line";
    }

    @GetMapping("/gauge")
    public String gauge(){
        return "demo/gauge";
    }

    @GetMapping("/pieData")
    @ResponseBody
    public ChartResult pieData(){
        PieData pieData = new PieData();

        Map pie = new HashMap(2);
        pie.put("name", "AAA");
        pie.put("value", 12);

        Map pie2 = new HashMap(2);
        pie2.put("name", "BBB");
        pie2.put("value", 36);


        pieData.add(pie);
        pieData.add(pie2);

        return new ChartResult(pieData);
    }


    @GetMapping("/treeData")
    @ResponseBody
    public ChartResult treeData(){
        TreeData<Map<String, String>> treeData = new TreeData<>();
        treeData.setParentKey("parentId");
        treeData.setRootValue("0");

        Map map = new HashMap(3);
        map.put("id", "1");
        map.put("name", "AAA");
        map.put("parentId", "0");

        Map map2 = new HashMap(3);
        map2.put("id", "2");
        map2.put("name", "BBB");
        map2.put("parentId", "1");

        Map map3 = new HashMap(3);
        map3.put("id", "3");
        map3.put("name", "CCC");
        map3.put("parentId", "1");

        Map map4 = new HashMap(3);
        map4.put("id", "4");
        map4.put("name", "DDD");
        map4.put("parentId", "2");

        List<Map<String, String>> list = new ArrayList<>();
        list.add(map);
        list.add(map2);
        list.add(map3);
        list.add(map4);

        treeData.setList(list);

        return new ChartResult(treeData);
    }

    @GetMapping("/barOrLineData")
    @ResponseBody
    public ChartResult barOrLineData(){

        BarData barData = new BarData();
        barData.setLegend(Arrays.asList(new String[]{"蒸发量", "降水量"}));
        barData.setCategory(Arrays.asList(new String[]{"1月","2月","3月","4月","5月","6月"}));

        List<List<String>> value = new ArrayList<>();
        value.add(Arrays.asList(new String[]{"2.0", "4.9", "7.0", "23.2", "25.6", "76.7"}));
        value.add(Arrays.asList(new String[]{"2.6", "5.9", "9.0", "26.4", "28.7", "70.7"}));
        barData.setValue(value);

        return new ChartResult(barData);
    }

    @GetMapping("/gaugeData")
    @ResponseBody
    public ChartResult gaugeData(){
        GaugeData gaugeData = new GaugeData();

        Map map = new HashMap(2);
        map.put("name", "成功率");
        map.put("value", 80);
        gaugeData.add(map);

        return new ChartResult(gaugeData);
    }
}
