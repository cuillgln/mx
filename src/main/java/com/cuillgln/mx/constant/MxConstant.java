package com.cuillgln.mx.constant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cuillgln.model.DropBean;
import com.cuillgln.util.StringUtil;

public class MxConstant {

	/**
	 * map 存放value/label
	 */

	public static final String SENSOR_PREFIX = "sensor_";

	/**
	 * 有效标志
	 */
	public static final int VALID_FLAG_NO = 0;
	public static final int VALID_FLAG_YES = 1;

	/**
	 * 是否已删除
	 */
	public static final int REMOVED_FLAG_NO = 0;
	public static final int REMOVED_FLAG_YES = 1;

	public static String getLabel(String type, String value) {
		if (StringUtil.isNotEmpty(type) && StringUtil.isNotEmpty(value)) {
			List<DropBean> dropList = labels.get(type);
			for (DropBean bean : dropList) {
				if (value.equals(bean.getValue())) {
					return bean.getLabel();
				}
			}
		}
		return "";
	}

	private static final Map<String, List<DropBean>> labels = new HashMap<>();
	static {
		/**
		 * 传感器类型 0:粉尘 1:甲烷 2:一氧化碳 6:温度 16:二氧化碳 17:氧气 100:开关
		 */
		List<DropBean> sensorTypeList = new ArrayList<>(7);
		sensorTypeList.add(new DropBean("0", "粉尘"));
		sensorTypeList.add(new DropBean("1", "瓦斯"));
		sensorTypeList.add(new DropBean("2", "一氧化碳"));
		sensorTypeList.add(new DropBean("6", "温度"));
		sensorTypeList.add(new DropBean("16", "二氧化碳"));
		sensorTypeList.add(new DropBean("17", "氧气"));
		sensorTypeList.add(new DropBean("100", "开关"));
		labels.put("sensorType", sensorTypeList);

		/**
		 * 开关量 0:开 -1:关
		 */
		List<DropBean> switchList = new ArrayList<>(2);
		switchList.add(new DropBean("0", "开"));
		switchList.add(new DropBean("-1", "停"));
		labels.put("switch", switchList);
	}
}
