package com.cuillgln.mx.entity.safetymonitoing;

import java.math.BigDecimal;

public class Point {

	private BigDecimal x;
	private BigDecimal y;

	public Point() {
	}

	public Point(BigDecimal x, BigDecimal y) {
		this.x = x;
		this.y = y;
	}

	public BigDecimal getX() {
		return x;
	}

	public BigDecimal getY() {
		return y;
	}

	@Override
	public String toString() {
		return "Point [x=" + x + ", y=" + y + "]";
	}

}
