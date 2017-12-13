package com.cuillgln.mx.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.SensorPosition;
import com.cuillgln.mx.entity.staffpositioning.Point;
import com.cuillgln.mx.entity.staffpositioning.StaffLocation;
import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.service.SensorPositionService;
import com.cuillgln.mx.service.StaffPositioningStationService;

@RestController
public class StaffPositioningStationController {

	@Autowired
	private StaffPositioningStationService service;

	@Autowired
	private SensorPositionService positionService;

	@RequestMapping(value = "/staffpositioningstation", method = RequestMethod.GET)
	public List<StaffPositioningStation> index() {
		return service.list();
	}

	@RequestMapping(value = "/staff/history", method = RequestMethod.GET)
	public List<StaffLocation> history(@RequestParam("rfId") Long rfId,
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
		List<StaffLocation> slList = service.queryHistory(rfId, begin, end);

		List<SensorPosition> positionList = positionService.list(SensorPosition.TYPE_STAFF_POSITIONING_STATION);
		Map<Long, Point> smsPointMap = new HashMap<>();
		for (SensorPosition sp : positionList) {
			smsPointMap.put(sp.getId(), new Point(sp.getX(), sp.getY()));
		}

		List<StaffLocation> result = new ArrayList<>();
		for (StaffLocation sl : slList) {
			sl.setPoint(smsPointMap.get(sl.getStationSystemId()));
			if (sl.getPoint() != null) {
				result.add(sl);
			}
		}

		return result;
	}
}
