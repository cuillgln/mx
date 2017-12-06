package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.SensorData;

@Repository
public interface SensorDataRepository extends CrudRepository<SensorData, Long> {

	Iterable<SensorData> findByValidFlag(int validFlag);
}
