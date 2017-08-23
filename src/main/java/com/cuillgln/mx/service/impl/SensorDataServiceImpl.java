package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.SensorData;
import com.cuillgln.mx.repository.SensorDataRepository;
import com.cuillgln.mx.service.SensorDataService;

@Service
public class SensorDataServiceImpl implements SensorDataService {

	@Autowired
	private SensorDataRepository sensorDataRepository;

	@Override
	public List<SensorData> list() {
		Iterable<SensorData> itr = sensorDataRepository.findByValidFlag(MxConstant.VALID_FLAG_YES);
		List<SensorData> result = new ArrayList<>();
		for (SensorData sensorData : itr) {
			result.add(fillup(sensorData));
		}
		return result;
	}

	@Override
	public SensorData get(Integer id) {
		// TODO 需要确认表数据
		return null;
	}

	private SensorData fillup(SensorData sensorData) {
		if (sensorData == null) {
			return null;
		}
		sensorData.setSensorId(MxConstant.SENSOR_PREFIX + sensorData.getSystemId());
		return sensorData;
	}
}
