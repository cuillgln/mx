package com.cuillgln.mx.entity.safetymonitoing;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "[逻辑报警配置表]")
public class LogicAlarm implements Serializable {

	private static final long serialVersionUID = 1L;

	// [ID]
	@Id
	@Column(name = "[ID]")
	private Long systemId;
	// ,[有效否]
	@Column(name = "[有效否]")
	private Integer validFlag;
	// ,[项目名称]
	@Column(name = "[项目名称]")
	private String project;
	// ,[是否应急联动]
	@Column(name = "[是否应急联动]")
	private Integer emergencyFlag;
	// ,[人员定位]
	@Column(name = "[人员定位]")
	private String staffPosition;
	// ,[语音广播]
	@Column(name = "[语音广播]")
	private String audioBroadcast;
	// ,[状态]
	@Column(name = "[状态]")
	private String status;

	public Long getSystemId() {
		return systemId;
	}

	public void setSystemId(Long systemId) {
		this.systemId = systemId;
	}

	public Integer getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(Integer validFlag) {
		this.validFlag = validFlag;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public Integer getEmergencyFlag() {
		return emergencyFlag;
	}

	public void setEmergencyFlag(Integer emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
	}

	public String getStaffPosition() {
		return staffPosition;
	}

	public void setStaffPosition(String staffPosition) {
		this.staffPosition = staffPosition;
	}

	public String getAudioBroadcast() {
		return audioBroadcast;
	}

	public void setAudioBroadcast(String audioBroadcast) {
		this.audioBroadcast = audioBroadcast;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
