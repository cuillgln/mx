package com.cuillgln.mx.entity.staffpositioning;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "[t_rymc]")
public class Staff implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "[RFID]")
	private Long rfId;
	@Column(name = "[ID]")
	private String id;
	@Column(name = "[Enabled]")
	private Integer enabled;
	@Column(name = "[name]")
	private String name;
	@Column(name = "[banzu]")
	private String banzu;
	@Column(name = "[is_xj]")
	private Integer xjFlag;
	@Column(name = "[is_bj]")
	private Integer bjFlag;
	@Column(name = "[is_dy]")
	private Integer dyFlag;
	@Column(name = "[fzAdd]")
	private Integer station;
	@Column(name = "[areaid]")
	private Integer areaId;

	public Long getRfId() {
		return rfId;
	}

	public void setRfId(Long rfId) {
		this.rfId = rfId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBanzu() {
		return banzu;
	}

	public void setBanzu(String banzu) {
		this.banzu = banzu;
	}

	public Integer getXjFlag() {
		return xjFlag;
	}

	public void setXjFlag(Integer xjFlag) {
		this.xjFlag = xjFlag;
	}

	public Integer getBjFlag() {
		return bjFlag;
	}

	public void setBjFlag(Integer bjFlag) {
		this.bjFlag = bjFlag;
	}

	public Integer getDyFlag() {
		return dyFlag;
	}

	public void setDyFlag(Integer dyFlag) {
		this.dyFlag = dyFlag;
	}

	public Integer getStation() {
		return station;
	}

	public void setStation(Integer station) {
		this.station = station;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

}
