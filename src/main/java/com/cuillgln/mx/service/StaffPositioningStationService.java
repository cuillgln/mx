package com.cuillgln.mx.service;

import java.util.Date;
import java.util.List;

import com.cuillgln.mx.entity.staffpositioning.StaffLocation;
import com.cuillgln.mx.entity.staffpositioning.StaffPosition;
import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;

public interface StaffPositioningStationService {

	public List<StaffPositioningStation> list();

	public List<StaffLocation> queryHistory(Long rfId, Date begin, Date end);
	
	
	public List<StaffPosition> queryAllStaff();
	
	public List<StaffPosition> queryVehicle();

}
