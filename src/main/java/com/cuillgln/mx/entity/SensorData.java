package com.cuillgln.mx.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 传感器实时数据表
 */
@Entity
@Table(name = "[即时数据表]")
public class SensorData implements Serializable {
	private static final long serialVersionUID = -1219021412826547465L;

	// [系统序号]
	@Id
	@Column(name = "[系统序号]")
	private Long systemId;

	@Transient
	private String sensorId;

	// [分站地址]
	@Column(name = "[分站地址]")
	private Long station;

	// [是否有效]
	@Column(name = "[有效否]")
	private Integer validFlag;

	// [当前值]
	@Column(name = "[当前值]")
	private BigDecimal value;
	// [最大值]
	@Column(name = "[最大值]")
	private BigDecimal maxValue;
	// [最小值]
	@Column(name = "[最小值]")
	private BigDecimal minValue;
	// [平均值]
	@Column(name = "[平均值]")
	private BigDecimal avgValue;

	// [报警否]
	@Column(name = "[报警否]")
	private Integer alarmFlag;
	// [报警信息]
	@Column(name = "[报警信息]")
	private String alarmInfo;
	// [传感器状态]
	@Column(name = "[传感器状态]")
	private Integer sensorState;
	// [时间]
	@Column(name = "[时间]")
	private Timestamp collectTime;
	// [上传否]
	@Column(name = "[上传否]")
	private Integer uploadFlag;
	// [当月累计值]
	@Column(name = "[当月累计值]")
	private BigDecimal monthAccumulateValue;
	// [当月累计次数]
	@Column(name = "[当月累计次数]")
	private Integer monthAccumulateCount;
	// [上传否2]
	@Column(name = "[上传否2]")
	private Integer uploadFlag2;

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

	public Integer getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(Integer validFlag) {
		this.validFlag = validFlag;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public BigDecimal getMaxValue() {
		return maxValue;
	}

	public void setMaxValue(BigDecimal maxValue) {
		this.maxValue = maxValue;
	}

	public BigDecimal getMinValue() {
		return minValue;
	}

	public void setMinValue(BigDecimal minValue) {
		this.minValue = minValue;
	}

	public BigDecimal getAvgValue() {
		return avgValue;
	}

	public void setAvgValue(BigDecimal avgValue) {
		this.avgValue = avgValue;
	}

	public Integer getAlarmFlag() {
		return alarmFlag;
	}

	public void setAlarmFlag(Integer alarmFlag) {
		this.alarmFlag = alarmFlag;
	}

	public String getAlarmInfo() {
		return alarmInfo;
	}

	public void setAlarmInfo(String alarmInfo) {
		this.alarmInfo = alarmInfo;
	}

	public Integer getSensorState() {
		return sensorState;
	}

	public void setSensorState(Integer sensorState) {
		this.sensorState = sensorState;
	}

	public Timestamp getCollectTime() {
		return collectTime;
	}

	public void setCollectTime(Timestamp collectTime) {
		this.collectTime = collectTime;
	}

	public Integer getUploadFlag() {
		return uploadFlag;
	}

	public void setUploadFlag(Integer uploadFlag) {
		this.uploadFlag = uploadFlag;
	}

	public BigDecimal getMonthAccumulateValue() {
		return monthAccumulateValue;
	}

	public void setMonthAccumulateValue(BigDecimal monthAccumulateValue) {
		this.monthAccumulateValue = monthAccumulateValue;
	}

	public Integer getMonthAccumulateCount() {
		return monthAccumulateCount;
	}

	public void setMonthAccumulateCount(Integer monthAccumulateCount) {
		this.monthAccumulateCount = monthAccumulateCount;
	}

	public Integer getUploadFlag2() {
		return uploadFlag2;
	}

	public void setUploadFlag2(Integer uploadFlag2) {
		this.uploadFlag2 = uploadFlag2;
	}

}
