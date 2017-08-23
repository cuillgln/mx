package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.Sensor;

public interface SensorService {

	public List<Sensor> list();

	public Sensor get(Long id);
}
