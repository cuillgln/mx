package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.SensorPosition;

public interface SensorPositionService {

	public List<SensorPosition> list();

	public void save(List<SensorPosition> positions);

	public void remove(List<SensorPosition> positions);
}
