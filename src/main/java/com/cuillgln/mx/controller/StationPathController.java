package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.Point;
import com.cuillgln.mx.service.StationPathService;

@RestController
public class StationPathController {

	@Autowired
	private StationPathService stationPathService;

	@RequestMapping(value = "/path/save", method = RequestMethod.POST)
	public String savePath(@RequestParam("start") long startStation, @RequestParam("stop") long stopStation,
			HttpEntity<List<Point>> pointsEntity) {
		stationPathService.save(startStation, stopStation, pointsEntity.getBody());
		return "{ \"result\": \"保存成功\"}";
	}
}
