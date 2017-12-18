package com.cuillgln.mx.entity.safetymonitoing;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "[分站路径表]")
public class StationPath implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "[系统序号]")
	private Long systemId;

	@Column(name = "[分站号起]")
	private Long startStation;

	@Column(name = "[分站号止]")
	private Long stopStation;

	@Column(name = "[路径]")
	private String path;

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}

	public Long getStartStation() {
		return startStation;
	}

	public void setStartStation(Long startStation) {
		this.startStation = startStation;
	}

	public Long getStopStation() {
		return stopStation;
	}

	public void setStopStation(Long stopStation) {
		this.stopStation = stopStation;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

}
