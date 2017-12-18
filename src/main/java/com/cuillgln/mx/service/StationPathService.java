package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.safetymonitoing.Point;
import com.cuillgln.mx.entity.staffpositioning.StaffLocation;

public interface StationPathService {

	void save(long startStation, long stopStation, List<Point> points);
	
	void delete(long startStation, long stopStation);

	List<Point> getPath(long startStation, long stopStation);
	
	public List<Point> getHistoryPath(List<StaffLocation> locations);
}
