package com.cuillgln.mx.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.domain.SensorPosition;

/**
 * 传感器位置
 * 
 * @author cuillgln
 *
 */
@RestController
public class SensorPositionController {

	@GetMapping("/sensorposition")
	public List<SensorPosition> list() {
		List<SensorPosition> positionList = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			SensorPosition position = new SensorPosition();
			String sensorName = "L0001_001_016A0" + i;
			position.setName(sensorName);
			position.setX(7.0);
			position.setY(3.0);
			positionList.add(position);
		}
		return positionList;
	}

	@PostMapping("/sensorposition")
	public String update(@RequestBody List<SensorPosition> positionList) {
		System.out.println(positionList.size());
		return "{\"result\":\"success\"}";
	}
	
	@PostMapping("/sensorposition/remove")
	public String remove(@RequestBody List<SensorPosition> positionList) {
		System.out.println(positionList.size());
		return "{\"result\":\"success\"}";
	}

	@GetMapping("/sensorposition/{id}")
	public SensorPosition get(String id) {
		SensorPosition position = new SensorPosition();
		position.setName(id);
		position.setX(7.0);
		position.setY(3.0);

		return position;
	}

	@PutMapping("/sensorposition/{id}")
	public SensorPosition put(SensorPosition position) {

		return position;
	}
}
