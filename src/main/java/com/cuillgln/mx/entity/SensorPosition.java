package com.cuillgln.mx.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 传感器位置表
 */
@Entity
@Table(name = "[端口位置表]")
public class SensorPosition implements Serializable {
	private static final long serialVersionUID = -4515230339355165807L;
	// [系统序号]
	@Id
	@Column(name = "[系统序号]")
	private Long systemId;

	@Transient
	private String sensorId;

	// [分站地址]
	@Column(name = "[分站地址]")
	private Long station;
	// [是否已删除]
	@Column(name = "[是否已删除]")
	private Integer removedFlag;
	// [是否有效]
	@Column(name = "[是否有效]")
	private Integer validFlag;

	// x-坐标
	// [横坐标]
	@Column(name = "[横坐标]")
	private BigDecimal x;
	// y-坐标
	// [纵坐标]
	@Column(name = "[纵坐标]")
	private BigDecimal y;
	// z-坐标
	// [竖坐标]
	@Column(name = "[竖坐标]")
	private BigDecimal z;
	// 经度
	// [经度]
	@Column(name = "[经度]")
	private BigDecimal lng;
	// 纬度
	// [纬度]
	@Column(name = "[纬度]")
	private BigDecimal lat;

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}

	public String getSensorId() {
		return sensorId;
	}

	public void setSensorId(String sensorId) {
		this.sensorId = sensorId;
	}

	public Long getStation() {
		return station;
	}

	public void setStation(Long station) {
		this.station = station;
	}

	public Integer getRemovedFlag() {
		return removedFlag;
	}

	public void setRemovedFlag(Integer removedFlag) {
		this.removedFlag = removedFlag;
	}

	public Integer getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(Integer validFlag) {
		this.validFlag = validFlag;
	}

	public BigDecimal getX() {
		return x;
	}

	public void setX(BigDecimal x) {
		this.x = x;
	}

	public BigDecimal getY() {
		return y;
	}

	public void setY(BigDecimal y) {
		this.y = y;
	}

	public BigDecimal getZ() {
		return z;
	}

	public void setZ(BigDecimal z) {
		this.z = z;
	}

	public BigDecimal getLng() {
		return lng;
	}

	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}

	public BigDecimal getLat() {
		return lat;
	}

	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}

}
