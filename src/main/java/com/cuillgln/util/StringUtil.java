package com.cuillgln.util;

public final class StringUtil {

	public static boolean isNotEmpty(String value) {
		if (value != null && !value.trim().equals("")) {
			return true;
		}
		return false;
	}
}
