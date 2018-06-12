package com.cuillgln.mx.entity.safetymonitoing;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "[交换机配置表]")
public class Hub implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "[序号]")
	private Long systemId;

	@Transient
	private String hubId;

	@Column(name = "[IP地址]")
	private String host;

	@Column(name = "[端口号]")
	private String port;

	@Column(name = "[安装地点]")
	private String location;

	@Column(name = "[状态]")
	private String status;

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

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getHubId() {
		return hubId;
	}

	public void setHubId(String hubId) {
		this.hubId = hubId;
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
