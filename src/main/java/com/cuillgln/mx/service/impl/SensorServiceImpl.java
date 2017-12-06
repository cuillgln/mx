package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.safetymonitoing.Sensor;
import com.cuillgln.mx.repository.safetymonitoring.SensorRepository;
import com.cuillgln.mx.service.SensorService;

@Service
public class SensorServiceImpl implements SensorService {

	@Autowired
	private SensorRepository sensorRepository;

	@Override
	public List<Sensor> list() {
		Iterable<Sensor> itr = sensorRepository.findByRemovedFlagAndValidFlag(MxConstant.REMOVED_FLAG_NO,
				MxConstant.VALID_FLAG_YES);
		List<Sensor> result = new ArrayList<>();
		for (Sensor sensor : itr) {
			result.add(fillup(sensor));
		}
		return result;
	}

	@Override
	public Sensor get(Long id) {
		if (id == null) {
			return null;
		}
		return fillup(sensorRepository.findOne(id));
	}

	private Sensor fillup(Sensor sensor) {
		if (sensor == null) {
			return null;
		}
		sensor.setSensorId(MxConstant.SENSOR_PREFIX + sensor.getSystemId());
		sensor.setStationPort(sensor.getStation() + "-" + sensor.getPortId());
		sensor.setAlarmValueRange(sensor.getAlarmMaxValue() + "/" + sensor.getAlarmMinValue());
		return sensor;
	}
}
