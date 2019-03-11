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
public class BarOrLineData implements ChartData {

    /**
     * 图例。['蒸发量','降水量']
     */
    private List<String> legend = Collections.emptyList();

    /**
     * 类别。['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     */
    private List<String> category = Collections.emptyList();

    /**
     * 值。[
     *         [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
     *         [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
     *     ]
     */
    private List<List<String>> value = Collections.emptyList();
}
