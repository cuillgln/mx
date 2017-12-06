package com.cuillgln.mx.repository.staffpositioning;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;

@Repository
public interface StaffPositioningStationRepository extends CrudRepository<StaffPositioningStation, Long> {

	Iterable<StaffPositioningStation> findByValidFlag(int validFlag);
}
