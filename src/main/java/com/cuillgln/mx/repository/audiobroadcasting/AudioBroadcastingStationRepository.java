package com.cuillgln.mx.repository.audiobroadcasting;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.audiobroadcasting.AudioBroadcastingStation;

@Repository
public interface AudioBroadcastingStationRepository extends CrudRepository<AudioBroadcastingStation, Long> {

}
