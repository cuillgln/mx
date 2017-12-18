package com.cuillgln.mx.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.entity.safetymonitoing.Point;
import com.cuillgln.mx.entity.safetymonitoing.StationPath;
import com.cuillgln.mx.entity.staffpositioning.StaffLocation;
import com.cuillgln.mx.repository.safetymonitoring.StationPathRepository;
import com.cuillgln.mx.service.StationPathService;

@Service
public class StationPathServiceImpl implements StationPathService {

	@Autowired
	private StationPathRepository repository;

	@Override
	public List<Point> getPath(long startStation, long stopStation) {
		List<Point> result = new ArrayList<>();
		StationPath sp = repository.findByStartStationAndStopStation(startStation, stopStation);
		if (sp == null) {
			return result;
		}

		// 转成point list
		String path = sp.getPath();
		String[] points = path.split(";");
		for (String pointStr : points) {
			String[] pointArr = pointStr.split(",");
			Point point = new Point(new BigDecimal(pointArr[0]), new BigDecimal(pointArr[1]));
			result.add(point);
		}

		return result;
	}

	@Override
	public void save(long startStation, long stopStation, List<Point> points) {
		StationPath sp = repository.findByStartStationAndStopStation(startStation, stopStation);
		StationPath reverseSp = repository.findByStartStationAndStopStation(stopStation, startStation);
		if (sp == null) {
			sp = new StationPath();
		}
		if (reverseSp == null) {
			reverseSp = new StationPath();
		}

		if (!points.isEmpty()) {
			StringBuilder pointStr = new StringBuilder(points.get(0).getX().toPlainString()).append(",")
					.append(points.get(0).getY().toPlainString());
			for (int i = 1; i < points.size(); i++) {
				pointStr.append(";").append(points.get(i).getX().toPlainString()).append(",")
						.append(points.get(i).getY().toPlainString());
			}
			sp.setStartStation(startStation);
			sp.setStopStation(stopStation);
			sp.setPath(pointStr.toString());
			repository.save(sp);

			int lastIndex = points.size() - 1;
			StringBuilder reversePointStr = new StringBuilder(points.get(lastIndex).getX().toPlainString()).append(",")
					.append(points.get(lastIndex).getY().toPlainString());
			for (int i = lastIndex - 1; i >= 0; i--) {
				reversePointStr.append(";").append(points.get(i).getX().toPlainString()).append(",")
						.append(points.get(i).getY().toPlainString());
			}
			reverseSp.setStartStation(stopStation);
			reverseSp.setStopStation(startStation);
			reverseSp.setPath(reversePointStr.toString());
			repository.save(reverseSp);
		}

	}

	@Override
	public void delete(long startStation, long stopStation) {
		StationPath sp = repository.findByStartStationAndStopStation(startStation, stopStation);
		StationPath reverseSp = repository.findByStartStationAndStopStation(stopStation, startStation);
		if (sp != null) {
			repository.delete(sp.getSystemId());
		}
		if (reverseSp != null) {
			repository.delete(reverseSp.getSystemId());
		}
	}

	@Override
	public List<Point> getHistoryPath(List<StaffLocation> locations) {
		List<Point> historyPath = new ArrayList<>();
		if (locations.size() < 2) {
			return historyPath;
		}
		for (int i = 1; i < locations.size(); i++) {
			long startStation = locations.get(i - 1).getStationSystemId();
			long stopStation = locations.get(i).getStationSystemId();
			List<Point> stationPath = getPath(startStation, stopStation);
			if (!stationPath.isEmpty()) {
				historyPath.addAll(stationPath);
			}
		}
		return historyPath;
	}

}
