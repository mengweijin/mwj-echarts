package com.mwj.echarts.emums;

/**
 * @author mengweijin
 * @description 坐标轴类型
 */
public enum AxisType {

    /**
     * 类别轴，分类轴坐标
     */
    CATEGORY("category"),

    /**
     * 值坐标
     */
    VALUE("value");

    private String value;

    AxisType(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
