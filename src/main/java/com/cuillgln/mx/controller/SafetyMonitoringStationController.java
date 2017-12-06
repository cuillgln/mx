package com.cuillgln.mx.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.SafetyMonitoringStation;

@RestController
public class SafetyMonitoringStationController {

	@RequestMapping(value = "/monitoringstation", method = RequestMethod.GET)
	public List<SafetyMonitoringStation> index() {
		List<SafetyMonitoringStation> list = new ArrayList<>();

		return list;
	}
}
