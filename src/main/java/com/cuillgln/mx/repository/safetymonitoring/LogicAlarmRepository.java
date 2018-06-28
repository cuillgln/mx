package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;

import com.cuillgln.mx.entity.safetymonitoing.LogicAlarm;

public interface LogicAlarmRepository extends CrudRepository<LogicAlarm, Long> {

	public Iterable<LogicAlarm> findByEmergencyFlagOrderBySystemIdDesc(int emergencyFlag);
}
