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
	public List<SensorPosition> list(int type) {
		Iterable<SensorPosition> itr = sensorPositionRepository.findByTypeAndRemovedFlag(type,
				MxConstant.REMOVED_FLAG_NO);
		List<SensorPosition> result = new ArrayList<>();
		for (SensorPosition sensorPosition : itr) {
			result.add(fillup(sensorPosition));
		}
		return result;
	}

	@Override
	public void save(List<SensorPosition> positions, int type) {
		for (SensorPosition sp : positions) {
			SensorPosition already = sensorPositionRepository.findByIdAndType(sp.getId(), type);
			if (already == null) {
				already = sp;
			}
			already.setType(type);
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
			SensorPosition already = sensorPositionRepository.findByIdAndType(sp.getId(), sp.getType());
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
		switch (sensorPosition.getType()) {
		case SensorPosition.TYPE_SENSOR:
			sensorPosition.setSensorId(MxConstant.SENSOR_PREFIX + sensorPosition.getId());
			break;
		case SensorPosition.TYPE_SAFETY_MONITORING_STATION:
			sensorPosition.setSensorId(MxConstant.SAFETY_MONITORING_STATION_PREFIX + sensorPosition.getId());
			break;
		case SensorPosition.TYPE_STAFF_POSITIONING_STATION:
			sensorPosition.setSensorId(MxConstant.STAFF_POSITIONING_STATION_PREFIX + sensorPosition.getId());
			break;
		case SensorPosition.TYPE_AUDIO_BROADCASTING_STATION:
			sensorPosition.setSensorId(MxConstant.AUDIO_BROADCASTING_STATION_PREFIX + sensorPosition.getId());
			break;
		case SensorPosition.TYPE_HUB:
			sensorPosition.setSensorId(MxConstant.HUB_PREFIX + sensorPosition.getId());
		default:
			sensorPosition.setSensorId(MxConstant.SENSOR_PREFIX + sensorPosition.getId());
			break;
		}
		return sensorPosition;
	}
}
