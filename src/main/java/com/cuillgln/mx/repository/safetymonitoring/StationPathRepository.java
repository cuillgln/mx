package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.StationPath;

@Repository
public interface StationPathRepository extends CrudRepository<StationPath, Long> {

	StationPath findByStartStationAndStopStation(long startStation, long stopStation);
}
