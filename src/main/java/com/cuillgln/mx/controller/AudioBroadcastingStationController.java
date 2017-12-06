package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.audiobroadcasting.AudioBroadcastingStation;
import com.cuillgln.mx.service.AudioBroadcastingStationService;

@RestController
public class AudioBroadcastingStationController {

	@Autowired
	private AudioBroadcastingStationService service;

	@RequestMapping(value = "/audiobroadcastingstation", method = RequestMethod.GET)
	public List<AudioBroadcastingStation> index() {
		return service.list();
	}
}
