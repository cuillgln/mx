package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.safetymonitoing.Hub;
import com.cuillgln.mx.repository.safetymonitoring.HubRepository;
import com.cuillgln.mx.service.HubService;

@Service
public class HubServiceImpl implements HubService {

	@Autowired
	private HubRepository repository;

	@Override
	public List<Hub> list() {
		List<Hub> list = new ArrayList<>();
		for (Hub hub : repository.findAll()) {
			list.add(fillup(hub));
		}
		return list;
	}

	@Override
	public Hub get(Long id) {
		return repository.findOne(id);
	}

	private Hub fillup(Hub st) {
		st.setValue(st.getStatus());
		st.setAlarmFlag(MxConstant.HUB_STATUS_BREAK.equals(st.getStatus()) ? 1 : 0);
		return st;
	}
}
