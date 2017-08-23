package com.cuillgln.mx.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 传感器信息表
 */
@Entity
@Table(name = "[端口参数表]")
public class Sensor implements Serializable {

	private static final long serialVersionUID = 4238644723597570220L;

	// [系统序号]
	@Id
	@Column(name = "[系统序号]")
	private Long systemId;

	@Transient
	private String sensorId;

	// [是否已删除]
	@Column(name = "[是否已删除]")
	private Integer removedFlag;

	// [是否有效]
	@Column(name = "[是否有效]")
	private Integer validFlag;

	// [传感器名称]
	@Column(name = "[传感器名称]")
	private String sensorName;

	// [传感器类型]
	@Column(name = "[传感器类型]")
	private Integer sensorType;
	@Transient
	private String sensorTypeName;

	// [传感器规格型号]
	@Column(name = "[传感器规格型号]")
	private String sensorModel;

	// [安装地点]
	@Column(name = "[安装地点]")
	private String location;

	// [分站地址]
	@Column(name = "[分站地址]")
	private Long station;
	// [端口序号]
	@Column(name = "[端口序号]")
	private Long portId;

	// [是否模拟量]
	@Column(name = "[是否模拟量]")
	private Integer analogFlag;
	// [停显示]
	@Column(name = "[停显示]")
	private String offName;
	// [开显示]
	@Column(name = "[开显示]")
	private String onName;

	// [单位]
	@Column(name = "[单位]")
	private String unit;
	// [系数]
	@Column(name = "[系数]")
	private BigDecimal factor;
	// [基值]
	@Column(name = "[基值]")
	private BigDecimal baseValue;

	// [是否报警]
	@Column(name = "[是否报警]")
	private Integer alarmFlag;
	// [报警方式]
	@Column(name = "[报警方式]")
	private Integer alarmType;
	// [报警上限值]
	@Column(name = "[报警上限值]")
	private BigDecimal alarmMaxValue;
	// [报警上限解除值]
	@Column(name = "[报警上限解除值]")
	private BigDecimal alarmClearMaxValue;
	// [报警下限值]
	@Column(name = "[报警下限值]")
	private BigDecimal alarmMinValue;

	// [报警下限解除值]
	@Column(name = "[报警下限解除值]")
	private BigDecimal alarmClearMinValue;

	// [是否断电控制]
	@Column(name = "[是否断电控制]")
	private Integer powerCutFlag;
	// [是否终端断电]
	@Column(name = "[是否终端断电]")
	private Integer powerCutTerminal;
	// [断电方式]
	@Column(name = "[断电方式]")
	private Integer powerCutType;
	// [断电值]
	@Column(name = "[断电值]")
	private BigDecimal powerCutValue;
	// [复电值]
	@Column(name = "[复电值]")
	private BigDecimal powerResetValue;

	// [是否多路控制]
	@Column(name = "[是否多路控制]")
	private Integer multiplexFlag;
	// [断电控制端口]
	@Column(name = "[断电控制端口]")
	private String powerCutPort;
	// [是否同步更新]
	@Column(name = "[是否同步更新]")
	private Integer syncUpdate;
	// [上传否]
	@Column(name = "[上传否]")
	private Integer uploadFlag;
	// [上传否2]
	@Column(name = "[上传否2]")
	private Integer uploadFlag2;
	// [异常值判定比率]
	@Column(name = "[异常值判定比率]")
	private BigDecimal anomalousPercent;
	// [异常值判定间隔]
	@Column(name = "[异常值判定间隔]")
	private Integer anomalousInterval;

	// [量程下限]
	@Column(name = "[量程下限]")
	private Integer meteMinValue;
	// [量程上限]
	@Column(name = "[量程上限]")
	private Integer meteMaxValue;
	// [显示方式]
	@Column(name = "[显示方式]")
	private Integer displayType;
	// [断电区域]
	@Column(name = "[断电区域]")
	private String powerCutRange;
	// [安装地点编号]
	@Column(name = "[安装地点编号]")
	private Integer locationNo;

	// [上传屏蔽否]
	@Column(name = "[上传屏蔽否]")
	private Integer uploadMask;
	// [上传屏蔽否2]
	@Column(name = "[上传屏蔽否2]")
	private Integer uploadMask2;
	// [上传屏蔽否3]
	@Column(name = "[上传屏蔽否3]")
	private Integer uploadMask3;
	// [上传屏蔽否4]
	@Column(name = "[上传屏蔽否4]")
	private Integer uploadMask4;

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

	public String getSensorName() {
		return sensorName;
	}

	public void setSensorName(String sensorName) {
		this.sensorName = sensorName;
	}

	public Integer getSensorType() {
		return sensorType;
	}

	public void setSensorType(Integer sensorType) {
		this.sensorType = sensorType;
	}

	public String getSensorTypeName() {
		return sensorTypeName;
	}

	public void setSensorTypeName(String sensorTypeName) {
		this.sensorTypeName = sensorTypeName;
	}

	public String getSensorModel() {
		return sensorModel;
	}

	public void setSensorModel(String sensorModel) {
		this.sensorModel = sensorModel;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Long getStation() {
		return station;
	}

	public void setStation(Long station) {
		this.station = station;
	}

	public Long getPortId() {
		return portId;
	}

	public void setPortId(Long portId) {
		this.portId = portId;
	}

	public Integer getAnalogFlag() {
		return analogFlag;
	}

	public void setAnalogFlag(Integer analogFlag) {
		this.analogFlag = analogFlag;
	}

	public String getOffName() {
		return offName;
	}

	public void setOffName(String offName) {
		this.offName = offName;
	}

	public String getOnName() {
		return onName;
	}

	public void setOnName(String onName) {
		this.onName = onName;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public BigDecimal getFactor() {
		return factor;
	}

	public void setFactor(BigDecimal factor) {
		this.factor = factor;
	}

	public BigDecimal getBaseValue() {
		return baseValue;
	}

	public void setBaseValue(BigDecimal baseValue) {
		this.baseValue = baseValue;
	}

	public Integer getAlarmFlag() {
		return alarmFlag;
	}

	public void setAlarmFlag(Integer alarmFlag) {
		this.alarmFlag = alarmFlag;
	}

	public Integer getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(Integer alarmType) {
		this.alarmType = alarmType;
	}

	public BigDecimal getAlarmMaxValue() {
		return alarmMaxValue;
	}

	public void setAlarmMaxValue(BigDecimal alarmMaxValue) {
		this.alarmMaxValue = alarmMaxValue;
	}

	public BigDecimal getAlarmClearMaxValue() {
		return alarmClearMaxValue;
	}

	public void setAlarmClearMaxValue(BigDecimal alarmClearMaxValue) {
		this.alarmClearMaxValue = alarmClearMaxValue;
	}

	public BigDecimal getAlarmMinValue() {
		return alarmMinValue;
	}

	public void setAlarmMinValue(BigDecimal alarmMinValue) {
		this.alarmMinValue = alarmMinValue;
	}

	public BigDecimal getAlarmClearMinValue() {
		return alarmClearMinValue;
	}

	public void setAlarmClearMinValue(BigDecimal alarmClearMinValue) {
		this.alarmClearMinValue = alarmClearMinValue;
	}

	public Integer getPowerCutFlag() {
		return powerCutFlag;
	}

	public void setPowerCutFlag(Integer powerCutFlag) {
		this.powerCutFlag = powerCutFlag;
	}

	public Integer getPowerCutTerminal() {
		return powerCutTerminal;
	}

	public void setPowerCutTerminal(Integer powerCutTerminal) {
		this.powerCutTerminal = powerCutTerminal;
	}

	public Integer getPowerCutType() {
		return powerCutType;
	}

	public void setPowerCutType(Integer powerCutType) {
		this.powerCutType = powerCutType;
	}

	public BigDecimal getPowerCutValue() {
		return powerCutValue;
	}

	public void setPowerCutValue(BigDecimal powerCutValue) {
		this.powerCutValue = powerCutValue;
	}

	public BigDecimal getPowerResetValue() {
		return powerResetValue;
	}

	public void setPowerResetValue(BigDecimal powerResetValue) {
		this.powerResetValue = powerResetValue;
	}

	public Integer getMultiplexFlag() {
		return multiplexFlag;
	}

	public void setMultiplexFlag(Integer multiplexFlag) {
		this.multiplexFlag = multiplexFlag;
	}

	public String getPowerCutPort() {
		return powerCutPort;
	}

	public void setPowerCutPort(String powerCutPort) {
		this.powerCutPort = powerCutPort;
	}

	public Integer getSyncUpdate() {
		return syncUpdate;
	}

	public void setSyncUpdate(Integer syncUpdate) {
		this.syncUpdate = syncUpdate;
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

	public BigDecimal getAnomalousPercent() {
		return anomalousPercent;
	}

	public void setAnomalousPercent(BigDecimal anomalousPercent) {
		this.anomalousPercent = anomalousPercent;
	}

	public Integer getAnomalousInterval() {
		return anomalousInterval;
	}

	public void setAnomalousInterval(Integer anomalousInterval) {
		this.anomalousInterval = anomalousInterval;
	}

	public Integer getMeteMinValue() {
		return meteMinValue;
	}

	public void setMeteMinValue(Integer meteMinValue) {
		this.meteMinValue = meteMinValue;
	}

	public Integer getMeteMaxValue() {
		return meteMaxValue;
	}

	public void setMeteMaxValue(Integer meteMaxValue) {
		this.meteMaxValue = meteMaxValue;
	}

	public Integer getDisplayType() {
		return displayType;
	}

	public void setDisplayType(Integer displayType) {
		this.displayType = displayType;
	}

	public String getPowerCutRange() {
		return powerCutRange;
	}

	public void setPowerCutRange(String powerCutRange) {
		this.powerCutRange = powerCutRange;
	}

	public Integer getLocationNo() {
		return locationNo;
	}

	public void setLocationNo(Integer locationNo) {
		this.locationNo = locationNo;
	}

	public Integer getUploadMask() {
		return uploadMask;
	}

	public void setUploadMask(Integer uploadMask) {
		this.uploadMask = uploadMask;
	}

	public Integer getUploadMask2() {
		return uploadMask2;
	}

	public void setUploadMask2(Integer uploadMask2) {
		this.uploadMask2 = uploadMask2;
	}

	public Integer getUploadMask3() {
		return uploadMask3;
	}

	public void setUploadMask3(Integer uploadMask3) {
		this.uploadMask3 = uploadMask3;
	}

	public Integer getUploadMask4() {
		return uploadMask4;
	}

	public void setUploadMask4(Integer uploadMask4) {
		this.uploadMask4 = uploadMask4;
	}

}
