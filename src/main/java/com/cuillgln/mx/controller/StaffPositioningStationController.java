package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.service.StaffPositioningStationService;

@RestController
public class StaffPositioningStationController {

	@Autowired
	private StaffPositioningStationService service;

	@RequestMapping(value = "/staffpositioningstation", method = RequestMethod.GET)
	public List<StaffPositioningStation> index() {

		return service.list();
	}
}
