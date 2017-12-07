package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.repository.staffpositioning.StaffPositioningStationRepository;
import com.cuillgln.mx.service.StaffPositioningStationService;

@Service
public class StaffPositioningStationServiceImpl implements StaffPositioningStationService {

	@Autowired
	private StaffPositioningStationRepository repository;

	@Override
	public List<StaffPositioningStation> list() {
		Iterable<StaffPositioningStation> stations = repository.findByValidFlag(MxConstant.VALID_FLAG_YES);
		List<StaffPositioningStation> list = new ArrayList<>();
		for (StaffPositioningStation st : stations) {
			list.add(fillup(st));
		}
		return list;
	}

	private StaffPositioningStation fillup(StaffPositioningStation st) {
		st.setStationId(MxConstant.STAFF_POSITIONING_STATION_PREFIX + st.getStation());
		return st;
	}
}
