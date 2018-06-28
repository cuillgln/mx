package com.cuillgln.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuillgln.mx.entity.safetymonitoing.LogicAlarm;
import com.cuillgln.mx.service.LogicAlarmService;

@RestController
public class LogicAlarmController {

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
			sb.append("应急联动->").append(la.getStatus()).append("，联动人员定位：").append(la.getStaffPosition())
					.append(" /语音广播：").append(la.getAudioBroadcast()).append("<br/>");
		}
		return sb.toString();
	}
}
