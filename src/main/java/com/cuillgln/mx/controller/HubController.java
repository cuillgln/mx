package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.Hub;
import com.cuillgln.mx.service.HubService;

@RestController
public class HubController {

	@Autowired
	private HubService hubService;

	@RequestMapping(value = "/hub", method = RequestMethod.GET)
	public List<Hub> index() {
		return hubService.list();
	}
}
