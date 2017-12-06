package com.cuillgln.mx.entity.audiobroadcasting;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "[t_GB_fenzhan]")
public class AudioBroadcastingStation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "[systemid]")
	private Long systemId;
	@Column(name = "[id]")
	private Long station;
	@Column(name = "[name]")
	private String stationName;
	@Column(name = "[address]")
	private String location;
	@Column(name = "[createtime]")
	private String createTime;
	@Column(name = "[type]")
	private Integer type;
	@Column(name = "[commid]")
	private String commId;
	@Column(name = "[yjldtype]")
	private Integer yjldType;
	@Column(name = "[yjldmessage]")
	private String yjldMessage;
	@Column(name = "[yjldname]")
	private String yjldName;
	@Column(name = "[remark]")
	private String remark;

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}

	public Long getStation() {
		return station;
	}

	public void setStation(Long station) {
		this.station = station;
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

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getCommId() {
		return commId;
	}

	public void setCommId(String commId) {
		this.commId = commId;
	}

	public Integer getYjldType() {
		return yjldType;
	}

	public void setYjldType(Integer yjldType) {
		this.yjldType = yjldType;
	}

	public String getYjldMessage() {
		return yjldMessage;
	}

	public void setYjldMessage(String yjldMessage) {
		this.yjldMessage = yjldMessage;
	}

	public String getYjldName() {
		return yjldName;
	}

	public void setYjldName(String yjldName) {
		this.yjldName = yjldName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
