package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.safetymonitoing.SensorPosition;

public interface SensorPositionService {

	public List<SensorPosition> list(int type);

	public void save(List<SensorPosition> positions, int type);

	public void remove(List<SensorPosition> positions);
}
