package com.cuillgln.mx.entity.staffpositioning;

import java.math.BigDecimal;

import javax.persistence.Column;

public class StaffPosition {

	private Long rfId;
	private String name;
	private Long stationSystemId;

	private BigDecimal x;
	private BigDecimal y;

	public Long getRfId() {
		return rfId;
	}

	public void setRfId(Long rfId) {
		this.rfId = rfId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getStationSystemId() {
		return stationSystemId;
	}

	public void setStationSystemId(Long stationSystemId) {
		this.stationSystemId = stationSystemId;
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

}
