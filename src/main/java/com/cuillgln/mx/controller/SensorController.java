package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.Sensor;
import com.cuillgln.mx.service.SensorService;

/**
 * 基本信息
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorController {

	@Autowired
	private SensorService sensorService;

	@RequestMapping(value = "/sensor", method = RequestMethod.GET)
	public List<Sensor> index() {
		return sensorService.list();
	}

	@RequestMapping(value = "/sensor/{id}", method = RequestMethod.GET)
	public Sensor get(Long id) {
		return sensorService.get(id);
	}
}
