package com.cuillgln.mx.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.entity.audiobroadcasting.AudioBroadcastingStation;
import com.cuillgln.mx.repository.audiobroadcasting.AudioBroadcastingStationRepository;
import com.cuillgln.mx.service.AudioBroadcastingStationService;

@Service
public class AudioBroadcastingStationServiceImpl implements AudioBroadcastingStationService {

	@Autowired
	private AudioBroadcastingStationRepository repository;

	@Override
	public List<AudioBroadcastingStation> list() {
		Iterable<AudioBroadcastingStation> stations = repository.findAll();
		List<AudioBroadcastingStation> list = new ArrayList<>();
		for (AudioBroadcastingStation st : stations) {
			list.add(st);
		}
		return list;
	}

}
