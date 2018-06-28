package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.safetymonitoing.LogicAlarm;
import com.cuillgln.mx.repository.safetymonitoring.LogicAlarmRepository;
import com.cuillgln.mx.service.LogicAlarmService;

@Service
public class LogicAlarmServiceImpl implements LogicAlarmService {

	@Autowired
	private LogicAlarmRepository repository;

	@Override
	public List<LogicAlarm> list() {
		List<LogicAlarm> result = new ArrayList<>();
		repository.findByEmergencyFlagOrderBySystemIdDesc(MxConstant.VALID_FLAG_YES).forEach(result::add);
		return result;
	}

}
