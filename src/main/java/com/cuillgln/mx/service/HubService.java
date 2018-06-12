package com.cuillgln.mx.service;

import java.util.List;

import com.cuillgln.mx.entity.safetymonitoing.Hub;

public interface HubService {

	public List<Hub> list();

	public Hub get(Long id);
}
