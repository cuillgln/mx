package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.SensorData;
import com.cuillgln.mx.service.SensorDataService;

/**
 * 实时数据
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorDataController {

	@Autowired
	private SensorDataService sensorDataService;

	@RequestMapping(value = "/sensordata", method = RequestMethod.GET)
	public List<SensorData> getData() {
		return sensorDataService.list();
	}

	@RequestMapping(value = "/sensordata/{id}", method = RequestMethod.GET)
	public SensorData getData(@PathVariable Long id) {

		return null;
	}
}
