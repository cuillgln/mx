package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.domain.Sensor;

/**
 * 基本信息
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorController {

	@RequestMapping(value = "/sensor", method = RequestMethod.GET)
	public List<Sensor> index() {

		return null;
	}

	@RequestMapping(value = "/sensor/{id}", method = RequestMethod.GET)
	public Sensor get(String id) {
		Sensor sensor = new Sensor();
		sensor.setName(id);

		return sensor;
	}
}
