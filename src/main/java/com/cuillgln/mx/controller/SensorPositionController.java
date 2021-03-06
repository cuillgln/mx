package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.SensorPosition;
import com.cuillgln.mx.service.SensorPositionService;

/**
 * 传感器位置
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorPositionController {

	@Autowired
	private SensorPositionService sensorPositionService;

	@GetMapping("/sensorposition/list/{type}")
	public List<SensorPosition> list(@PathVariable int type) {
		return sensorPositionService.list(type);
	}

	@PostMapping("/sensorposition/update/{type}")
	public String update(@PathVariable int type, @RequestBody List<SensorPosition> positionList) {
		sensorPositionService.save(positionList, type);
		return "{\"result\":\"success\"}";
	}

	@PostMapping("/sensorposition/remove")
	public String remove(@RequestBody List<SensorPosition> positionList) {
		sensorPositionService.remove(positionList);
		return "{\"result\":\"success\"}";
	}

	@GetMapping("/sensorposition/{id}")
	public SensorPosition get(@PathVariable Long id) {
		SensorPosition position = new SensorPosition();

		return position;
	}

	@PutMapping("/sensorposition/{id}")
	public SensorPosition put(@PathVariable Long id, SensorPosition position) {

		return position;
	}
}
