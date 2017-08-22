package com.cuillgln.mx.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.domain.SensorData;

/**
 * 实时数据
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorDataController {

	@RequestMapping(value = "/sensordata", method = RequestMethod.GET)
	public List<SensorData> getData() {
		List<SensorData> dataList = new ArrayList<>();
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < 10; i++) {
			SensorData data = new SensorData();
			String sensorName = "L0001_001_016A0" + i;
			data.setName(sensorName);
			data.setValue(Math.round(random.nextDouble() * 100));
			dataList.add(data);
		}
		return dataList;
	}

	@RequestMapping(value = "/sensordata/{id}", method = RequestMethod.GET)
	public SensorData getData(String id) {
		SensorData data = new SensorData();
		data.setName(id);
		data.setValue(Math.round(Math.random() * 100));

		return data;
	}
}
