package com.mwj.echarts;

import lombok.Data;

/**
 * @author Meng Wei Jin
 * @description
 **/
@Data
public class ChartResult<ChartData> {

    /**
     * 返回的图表数据结果
     */
    private ChartData data;

}
