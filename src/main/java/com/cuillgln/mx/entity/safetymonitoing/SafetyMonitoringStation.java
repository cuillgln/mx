package com.cuillgln.mx.entity.safetymonitoing;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "[站点配置表]")
public class SafetyMonitoringStation implements Serializable {

	private static final long serialVersionUID = 1L;

	// [序号]
	@Id
	@Column(name = "[序号]")
	private Long systemId;

	@Transient
	private String stationId;

	// [有效否]
	@Column(name = "[有效否]")
	private Integer validFlag;
	// [分站地址]
	@Column(name = "[分站地址]")
	private Long station;
	// [分站名称]
	@Column(name = "[分站名称]")
	private String stationName;
	// [安装地点]
	@Column(name = "[安装地点]")
	private String location;
	// [安装时间]
	@Column(name = "[安装时间]")
	private Timestamp createTime;
	// [运行状态]
	@Column(name = "[运行状态]")
	private String runningState;
	// [掉电次数统计]
	@Column(name = "[掉电次数统计]")
	private Long powerCutCount;
	// [最近掉电时间]
	@Column(name = "[最近掉电时间]")
	private Timestamp powerCutTime;
	// [分站上次整定时间]
	@Column(name = "[分站上次整定时间]")
	private Timestamp settingTime;
	// [当前整定端口序号]
	@Column(name = "[当前整定端口序号]")
	private Integer settingPort;
	// [上传否]
	@Column(name = "[上传否]")
	private Integer uploadFlag;
	// [上传否2]
	@Column(name = "[上传否2]")
	private Integer uploadFlag2;
	// [是否就地断电]
	@Column(name = "[是否就地断电]")
	private Integer powerCutFlag;
	// [分站参数整定否]
	@Column(name = "[分站参数整定否]")
	private Integer settingFlag;
	// [是否风电瓦斯闭锁]
	@Column(name = "[是否风电瓦斯闭锁]")
	private Integer ch4LockFlag;
	// [开出端口名称]
	@Column(name = "[开出端口名称]")
	private String portName;
	// [馈电关联监测]
	@Column(name = "[馈电关联监测]")
	private String feedMonitor;
	// [安装地点编号]
	// @Column(name = "[安装地点编号]")
	@Transient
	private Integer locationNo;
	// [屏蔽否]
	@Column(name = "[屏蔽否]")
	private Integer maskFlag;
	// [commid]
	// @Column(name = "[commid]")
	@Transient
	private String commId;

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

	public Integer getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(Integer validFlag) {
		this.validFlag = validFlag;
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

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public String getRunningState() {
		return runningState;
	}

	public void setRunningState(String runningState) {
		this.runningState = runningState;
	}

	public Long getPowerCutCount() {
		return powerCutCount;
	}

	public void setPowerCutCount(Long powerCutCount) {
		this.powerCutCount = powerCutCount;
	}

	public Timestamp getPowerCutTime() {
		return powerCutTime;
	}

	public void setPowerCutTime(Timestamp powerCutTime) {
		this.powerCutTime = powerCutTime;
	}

	public Timestamp getSettingTime() {
		return settingTime;
	}

	public void setSettingTime(Timestamp settingTime) {
		this.settingTime = settingTime;
	}

	public Integer getSettingPort() {
		return settingPort;
	}

	public void setSettingPort(Integer settingPort) {
		this.settingPort = settingPort;
	}

	public Integer getUploadFlag() {
		return uploadFlag;
	}

	public void setUploadFlag(Integer uploadFlag) {
		this.uploadFlag = uploadFlag;
	}

	public Integer getUploadFlag2() {
		return uploadFlag2;
	}

	public void setUploadFlag2(Integer uploadFlag2) {
		this.uploadFlag2 = uploadFlag2;
	}

	public Integer getPowerCutFlag() {
		return powerCutFlag;
	}

	public void setPowerCutFlag(Integer powerCutFlag) {
		this.powerCutFlag = powerCutFlag;
	}

	public Integer getSettingFlag() {
		return settingFlag;
	}

	public void setSettingFlag(Integer settingFlag) {
		this.settingFlag = settingFlag;
	}

	public Integer getCh4LockFlag() {
		return ch4LockFlag;
	}

	public void setCh4LockFlag(Integer ch4LockFlag) {
		this.ch4LockFlag = ch4LockFlag;
	}

	public String getPortName() {
		return portName;
	}

	public void setPortName(String portName) {
		this.portName = portName;
	}

	public String getFeedMonitor() {
		return feedMonitor;
	}

	public void setFeedMonitor(String feedMonitor) {
		this.feedMonitor = feedMonitor;
	}

	public Integer getLocationNo() {
		return locationNo;
	}

	public void setLocationNo(Integer locationNo) {
		this.locationNo = locationNo;
	}

	public Integer getMaskFlag() {
		return maskFlag;
	}

	public void setMaskFlag(Integer maskFlag) {
		this.maskFlag = maskFlag;
	}

	public String getCommId() {
		return commId;
	}

	public void setCommId(String commId) {
		this.commId = commId;
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
