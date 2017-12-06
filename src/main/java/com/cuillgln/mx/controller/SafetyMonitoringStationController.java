package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.SafetyMonitoringStation;
import com.cuillgln.mx.service.SafetyMonitoringStationService;

@RestController
public class SafetyMonitoringStationController {

	@Autowired
	private SafetyMonitoringStationService service;

	@RequestMapping(value = "/safetymonitoringstation", method = RequestMethod.GET)
	public List<SafetyMonitoringStation> index() {
		return service.list();
	}
}
