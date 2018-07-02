package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.LogicAlarm;
import com.cuillgln.mx.service.LogicAlarmService;

@RestController
public class LogicAlarmController {

	@Value("${app.alarmFormat}")
	private String alarmFormat;

	@Autowired
	private LogicAlarmService service;

	@RequestMapping(value = "/logicAlarm", method = RequestMethod.GET)
	public String alarmMessage() {
		List<LogicAlarm> list = service.list();
		if (list.isEmpty()) {
			return "";
		}
		StringBuilder sb = new StringBuilder();
		for (LogicAlarm la : list) {
			sb.append(String.format(alarmFormat, la.getStatus(), la.getStaffPosition(), la.getAudioBroadcast(),
					la.getAssociate())).append("<br/>");
		}
		return sb.toString();
	}
}
