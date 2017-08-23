package com.cuillgln.mx.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.Sensor;

@Repository
public interface SensorRepository extends CrudRepository<Sensor, Long> {

	Iterable<Sensor> findByRemovedFlagAndValidFlag(int removedFlag, int validFlag);

}
