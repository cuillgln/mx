package com.cuillgln.mx.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.cuillgln.mx.constant.MxConstant;
import com.cuillgln.mx.entity.staffpositioning.StaffPosition;
import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.entity.staffpositioning.StationStaffCount;
import com.cuillgln.mx.repository.staffpositioning.StaffPositioningStationRepository;
import com.cuillgln.mx.service.StaffPositioningStationService;

@Service
public class StaffPositioningStationServiceImpl implements StaffPositioningStationService {

	@Autowired
	private StaffPositioningStationRepository repository;

	@Qualifier("kj289JdbcTemplate")
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<StaffPositioningStation> list() {
		Map<Long, Integer> sscMap = getStaffCount();
		Map<Long, String> ssMap = getStaffDetails();
		Iterable<StaffPositioningStation> stations = repository.findByValidFlag(MxConstant.VALID_FLAG_YES);
		List<StaffPositioningStation> list = new ArrayList<>();
		for (StaffPositioningStation st : stations) {
			st.setStaffCount(sscMap.get(st.getSystemId()));
			st.setStaff(ssMap.get(st.getSystemId()));
			list.add(fillup(st));
		}
		return list;
	}

	private StaffPositioningStation fillup(StaffPositioningStation st) {
		st.setStationId(MxConstant.STAFF_POSITIONING_STATION_PREFIX + st.getSystemId());
		st.setValue(st.getRemark());
		st.setAlarmFlag(MxConstant.STATION_COMMUNICATION_BREAK.equals(st.getRemark()) ? 1 : 0);
		return st;
	}

	private Map<Long, Integer> getStaffCount() {
		String sql = "SELECT [分站号], [人数], [分站状态] FROM [v_fenzhancount]";
		List<StationStaffCount> sscList = jdbcTemplate.query(sql, new RowMapper<StationStaffCount>() {

			@Override
			public StationStaffCount mapRow(ResultSet rs, int rowNum) throws SQLException {
				StationStaffCount ssc = new StationStaffCount();
				ssc.setSystemId(rs.getLong(1));
				ssc.setStaffCount(rs.getInt(2));
				return ssc;
			}
		});
		Map<Long, Integer> sscMap = new HashMap<>();
		for (StationStaffCount ssc : sscList) {
			sscMap.put(ssc.getSystemId(), ssc.getStaffCount());
		}
		return sscMap;
	}

	private Map<Long, String> getStaffDetails() {
		String sql = "SELECT [RFID], [name], [fzAdd] FROM [t_rymc]";
		List<StaffPosition> spList = jdbcTemplate.query(sql, new RowMapper<StaffPosition>() {

			@Override
			public StaffPosition mapRow(ResultSet rs, int rowNum) throws SQLException {
				StaffPosition sp = new StaffPosition();
				sp.setRfId(rs.getLong(1));
				sp.setName(rs.getString(2));
				sp.setStationSystemId(rs.getLong(3));
				return sp;
			}
		});
		Map<Long, String> ssMap = new HashMap<>();
		for (StaffPosition sp : spList) {
			if (ssMap.containsKey(sp.getStationSystemId())) {
				ssMap.put(sp.getStationSystemId(),
						ssMap.get(sp.getStationSystemId()) + "," + sp.getName() + "(" + sp.getRfId() + ")");
			} else {
				ssMap.put(sp.getStationSystemId(), sp.getName() + "(" + sp.getRfId() + ")");
			}
		}

		return ssMap;
	}

}
