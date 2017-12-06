package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.safetymonitoing.SensorData;

public interface SensorDataService {

	public List<SensorData> list();

	public SensorData get(Integer id);

}
