package com.cuillgln.util;

public final class StringUtil {

	public static boolean isNotEmpty(String value) {
		if (value != null && !value.trim().equals("") && !value.trim().equals("null")) {
			return true;
		}
		return false;
	}

	public static String filterNull(Object value) {
		if (value != null && isNotEmpty(value.toString())) {
			return value.toString();
		}
		return "";
	}
}
