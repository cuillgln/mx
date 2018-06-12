package com.cuillgln.mx.repository.safetymonitoring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cuillgln.mx.entity.safetymonitoing.Hub;

@Repository
public interface HubRepository extends CrudRepository<Hub, Long> {

}
