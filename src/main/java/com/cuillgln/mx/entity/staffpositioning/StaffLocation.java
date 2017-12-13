package com.cuillgln.mx.entity.staffpositioning;

import java.util.Date;

public class StaffLocation {

	private Long rfId;
	private String name;
	private Long stationSystemId;
	private Date arriveTime;

	private Point point;

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

	public Date getArriveTime() {
		return arriveTime;
	}

	public void setArriveTime(Date arriveTime) {
		this.arriveTime = arriveTime;
	}

	public Point getPoint() {
		return point;
	}

	public void setPoint(Point point) {
		this.point = point;
	}

}
