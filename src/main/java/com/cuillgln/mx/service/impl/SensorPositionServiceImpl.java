package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.safetymonitoing.SensorPosition;
import com.cuillgln.mx.repository.safetymonitoring.SensorPositionRepository;
import com.cuillgln.mx.service.SensorPositionService;

@Service
public class SensorPositionServiceImpl implements SensorPositionService {

	@Autowired
	private SensorPositionRepository sensorPositionRepository;

	@Override
	public List<SensorPosition> list() {
		Iterable<SensorPosition> itr = sensorPositionRepository.findByRemovedFlag(MxConstant.REMOVED_FLAG_NO);
		List<SensorPosition> result = new ArrayList<>();
		for (SensorPosition sensorPosition : itr) {
			result.add(fillup(sensorPosition));
		}
		return result;
	}

	@Override
	public void save(List<SensorPosition> positions) {
		for (SensorPosition sp : positions) {
			SensorPosition already = sensorPositionRepository.findOne(sp.getSystemId());
			if (already == null) {
				already = sp;
			}
			already.setX(sp.getX());
			already.setY(sp.getY());
			already.setZ(sp.getZ());
			already.setLng(sp.getLng());
			already.setLat(sp.getLat());
			already.setRemovedFlag(MxConstant.REMOVED_FLAG_NO);
			already.setValidFlag(MxConstant.VALID_FLAG_YES);
			sensorPositionRepository.save(already);
		}
	}

	@Override
	public void remove(List<SensorPosition> positions) {
		for (SensorPosition sp : positions) {
			SensorPosition already = sensorPositionRepository.findOne(sp.getSystemId());
			if (already != null) {
				already.setRemovedFlag(MxConstant.REMOVED_FLAG_YES);
				sensorPositionRepository.save(already);
			}
		}
	}

	private SensorPosition fillup(SensorPosition sensorPosition) {
		if (sensorPosition == null) {
			return null;
		}
		sensorPosition.setSensorId(MxConstant.SENSOR_PREFIX + sensorPosition.getSystemId());
		return sensorPosition;
	}
}
