package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.Sensor;

@Repository
public interface SensorRepository extends CrudRepository<Sensor, Long> {

	Iterable<Sensor> findByRemovedFlagAndValidFlag(int removedFlag, int validFlag);

}
