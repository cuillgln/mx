package com.cuillgln.model;

import java.io.Serializable;

public class DropBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String value;
	private String label;

	public DropBean(String value, String label) {
		this.value = value;
		this.label = label;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

}
