package com.mwj.echarts;

import com.mwj.echarts.interf.ChartData;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

/**
 * @author Meng Wei Jin
 * @description
 **/
@Data
@RequiredArgsConstructor
public class ChartResult {

    /**
     * 返回的图表数据结果
     */
    @NonNull
    private ChartData data;

    /**
     * 请求成功的标识
     */
    private int code = 0;

    /**
     * 附加信息
     */
    private String message;
}
