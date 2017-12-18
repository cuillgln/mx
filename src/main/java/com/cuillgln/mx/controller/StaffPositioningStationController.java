package com.cuillgln.mx.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.Point;
import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.service.StaffPositioningStationService;
import com.cuillgln.mx.service.StationPathService;

@RestController
public class StaffPositioningStationController {

	@Autowired
	private StaffPositioningStationService service;

	@Autowired
	private StationPathService stationPathService;

	@RequestMapping(value = "/staffpositioningstation", method = RequestMethod.GET)
	public List<StaffPositioningStation> index() {
		return service.list();
	}

	@RequestMapping(value = "/staff/history", method = RequestMethod.GET)
	public List<Point> history(@RequestParam("rfId") Long rfId,
			@RequestParam("begin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date begin,
			@RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd") Date end) {

		if (rfId == null) {
			throw new IllegalArgumentException("rfId cannot be null.");
		}
		if (begin == null) {
			begin = new Date();
		}
		if (end == null) {
			end = new Date();
		}
		List<Point> points = stationPathService.getHistoryPath(service.queryHistory(rfId, begin, end));

		return points;
	}
}
