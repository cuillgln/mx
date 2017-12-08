package com.cuillgln.mx.entity.audiobroadcasting;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "[t_GB_fenzhan]")
public class AudioBroadcastingStation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "[systemid]")
	private Long systemId;

	@Transient
	private String stationId;

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

	// 实时值
	@Transient
	private String value;
	// 报警状态
	@Transient
	private Integer alarmFlag;

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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getAlarmFlag() {
		return alarmFlag;
	}

	public void setAlarmFlag(Integer alarmFlag) {
		this.alarmFlag = alarmFlag;
	}

}
