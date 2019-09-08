package com.mwj.echarts.impl;

import com.mwj.echarts.interf.ChartData;
import lombok.Data;

import java.util.Collections;
import java.util.List;

/**
 * @author Meng Wei Jin
 * @description
 **/
@Data
public class TreeData<T> implements ChartData {

    /**
     * 根值，树图或者级联数据最顶层的数据的value
     */
    private String rootValue = "0";

    /**
     * 标识父id的属性的名称，如：parentId
     */
    private String parentKey = "parentId";

    /**
     * 数据集，泛型为业务对象
     */
    private List<T> list = Collections.emptyList();

}
