package com.cuillgln.mx.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.SensorData;

@Repository
public interface SensorDataRepository extends CrudRepository<SensorData, Long> {

	Iterable<SensorData> findByValidFlag(int validFlag);
}
