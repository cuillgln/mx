package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.Sensor;

@Repository
public interface SensorRepository extends CrudRepository<Sensor, Long> {

	Iterable<Sensor> findByRemovedFlagAndValidFlag(int removedFlag, int validFlag);

	/**
	 * 是否已删除”  只要是 =1 就是删除了   不等于1 就是没删除
	 * “是否有效” 只要不等于0  就都是有效
	 * @param removedFlag
	 * @param validFlag
	 * @return
	 */
	Iterable<Sensor> findByRemovedFlagNotAndValidFlagNotOrderByStationAscPortIdAsc(int removedFlag, int validFlag);
}
