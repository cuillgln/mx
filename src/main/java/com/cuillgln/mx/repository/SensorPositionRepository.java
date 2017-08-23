package com.cuillgln.mx.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.SensorPosition;

@Repository
public interface SensorPositionRepository extends CrudRepository<SensorPosition, Long> {

	Iterable<SensorPosition> findByRemovedFlag(int removedFlag);
}
