package com.cuillgln.mx.entity.staffpositioning;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "[t_fenzhan]")
public class StaffPositioningStation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "[dizhi]")
	private Long systemId;

	@Transient
	private String stationId;

	@Column(name = "[id]")
	private Long station;
	@Column(name = "[enabled]")
	private Integer validFlag;
	@Column(name = "[name]")
	private String stationName;
	@Column(name = "[address]")
	private String location;
	@Column(name = "[createdt]")
	private Timestamp createTime;
	@Column(name = "[fztype]")
	private Integer type;
	@Column(name = "[areaid]")
	private Integer areaId;
	@Column(name = "[comid]")
	private String commId;
	@Column(name = "[remark]")
	private String remark;

	@Transient
	private String staff;

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}

	public String getStationId() {
		return stationId;
	}

	public void setStationId(String stationId) {
		this.stationId = stationId;
	}

	public Long getStation() {
		return station;
	}

	public void setStation(Long station) {
		this.station = station;
	}

	public Integer getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(Integer validFlag) {
		this.validFlag = validFlag;
	}

	public String getStationName() {
		return stationName;
	}

	public void setStationName(String stationName) {
		this.stationName = stationName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public String getCommId() {
		return commId;
	}

	public void setCommId(String commId) {
		this.commId = commId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStaff() {
		return staff;
	}

	public void setStaff(String staff) {
		this.staff = staff;
	}
}
