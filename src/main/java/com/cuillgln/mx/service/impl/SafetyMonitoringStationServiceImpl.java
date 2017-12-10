package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.safetymonitoing.SafetyMonitoringStation;
import com.cuillgln.mx.repository.safetymonitoring.SafetyMonitoringStationRepository;
import com.cuillgln.mx.service.SafetyMonitoringStationService;

@Service
public class SafetyMonitoringStationServiceImpl implements SafetyMonitoringStationService {

	@Autowired
	private SafetyMonitoringStationRepository repository;

	@Override
	public List<SafetyMonitoringStation> list() {
		Iterable<SafetyMonitoringStation> stations = repository.findByValidFlag(MxConstant.VALID_FLAG_YES);
		List<SafetyMonitoringStation> list = new ArrayList<>();
		for (SafetyMonitoringStation st : stations) {
			list.add(fillup(st));
		}
		return list;
	}

	private SafetyMonitoringStation fillup(SafetyMonitoringStation st) {
		st.setStationId(MxConstant.SAFETY_MONITORING_STATION_PREFIX + st.getSystemId());
		if (st.getPortName() != null) {
			st.setPortName(st.getPortName().replaceAll("\b", "\\\\b"));
		}
		if (st.getFeedMonitor() != null) {
			st.setFeedMonitor(st.getFeedMonitor().replaceAll("\b", "\\\\b"));
		}
		st.setValue(st.getRunningState());
		st.setAlarmFlag(MxConstant.STATION_COMMUNICATION_BREAK.equals(st.getRunningState()) ? 1 : 0);
		return st;
	}
}
