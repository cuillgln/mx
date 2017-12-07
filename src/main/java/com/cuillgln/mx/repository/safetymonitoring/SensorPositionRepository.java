package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.SensorPosition;

@Repository
public interface SensorPositionRepository extends CrudRepository<SensorPosition, Long> {

	Iterable<SensorPosition> findByRemovedFlag(int removedFlag);
	
	SensorPosition findByIdAndType(long id, int type);
}
