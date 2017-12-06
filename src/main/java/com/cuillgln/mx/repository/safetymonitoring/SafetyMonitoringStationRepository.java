package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.SafetyMonitoringStation;

@Repository
public interface SafetyMonitoringStationRepository extends CrudRepository<SafetyMonitoringStation, Long> {

	Iterable<SafetyMonitoringStation> findByValidFlag(int validFlag);

}
