/**
 * @fileoverview 元图数据类,对外开放。
 *
 * @author Metamap Map Api Group
 */

/**
 * @正常时候测点显示的图片路径
 * 
 */
var imgNormalMap = {};
// 一氧化碳
imgNormalMap[0] = "co-normal.png";
// 甲烷
imgNormalMap[1] = "gas-normal.png";
// 二氧化碳
imgNormalMap[2] = "co2-normal.png";
// 氧气
imgNormalMap[3] = "o2-normal.png";
// 温度
imgNormalMap[6] = "temparture-normal.png";
// 风速
imgNormalMap[7] = "speed-normal.png";

/**
 * @报警时候测点显示的图片路径
 */
var imgAlarmMap = {};
for ( var key in imgNormalMap) {
	// 获取正常图片路径
	var normalImg = imgNormalMap[key];
	// 字符串替换
	var alarmImg = normalImg.replace("normal", "alarm");
	// 添加到map
	imgAlarmMap[key] = alarmImg;
}

/**
 * @namespace 所有library类均放在mxLib命名空间下
 */
(function() {
	/**
	 * @exports Data as mxLib.Data
	 */
	var Sensor =
	/**
	 * Data类的构造函数 sensor传感器对象
	 */
	mxLib.Sensor = function() {
		// 所有传感器对象集合
		this.sensorMap = {};
		this.sensorData = {};
		this.sensorPosition = {};
		this.removedSensorPosition = {};
	}

	/**
	 * 加载各类专业定义数据
	 */
	Sensor.prototype.getSensorInfo = function() {
		var arr = [];
		for (var i = 0; i < 10; i++) {
			var item = {};
			// 传感器编号
			item.SensorID = 'L0001_001_016A0' + i.toString();
			switch (i) {
			case 0:
				item.Location = '14103辅运副巷配电点CH4';
				item.SensorTypeID = '1';
				item.SensorType = '低浓度甲烷';
				item.SensorDataID = '1';
				item.Unit = '%';
				item.MinMete = 0.00;
				item.MaxMete = 4.00;
				item.MinAlarm = 0.50;
				item.MaxAlarm = 0.80;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.49;
				item.LResetValue = 0.00;
				break;
			case 1:
				item.Location = '二号煤仓联络巷工作面CH4';
				item.SensorTypeID = '1';
				item.SensorType = '高浓度甲烷';
				item.SensorDataID = '1';
				item.Unit = '%';
				item.MinMete = 0.00;
				item.MaxMete = 4.00;
				item.MinAlarm = 0.80;
				item.MaxAlarm = 1.20;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.79;
				item.LResetValue = 0.00;
				break;
			case 2:
				item.Location = '避难硐室后门外CH4';
				item.SensorTypeID = '1';
				item.SensorType = '高浓度甲烷';
				item.SensorDataID = '1';
				item.Unit = '%';
				item.MinMete = 0.00;
				item.MaxMete = 4.00;
				item.MinAlarm = 0.80;
				item.MaxAlarm = 1.20;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.79;
				item.LResetValue = 0.00;
				break;
			case 3:
				item.Location = 'CO避难硐室后门过渡仓';
				item.SensorTypeID = '0';
				item.SensorType = '一氧化碳';
				item.SensorDataID = '1';
				item.Unit = 'ppm';
				item.MinMete = 0.00;
				item.MaxMete = 500.00;
				item.MinAlarm = 24.00;
				item.MaxAlarm = 1.20;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.79;
				item.LResetValue = 0.00;
				break;
			case 4:
				item.Location = 'WD14201工作面';
				item.SensorTypeID = '6';
				item.SensorType = '温度';
				item.SensorDataID = '1';
				item.Unit = '℃';
				item.MinMete = 0.00;
				item.MaxMete = 50.00;
				item.MinAlarm = 40.00;
				item.MaxAlarm = 45.00;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			case 5:
				item.Location = 'FS北总回风(西)';
				item.SensorTypeID = '7';
				item.SensorType = '风速';
				item.SensorDataID = '1';
				item.Unit = 'm/s';
				item.MinMete = 0.00;
				item.MaxMete = 15.00;
				item.MinAlarm = 8.00;
				item.MaxAlarm = 0.00;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			case 6:
				item.Location = 'O2避难硐室前门外';
				item.SensorTypeID = '3';
				item.SensorType = '氧气';
				item.SensorDataID = '1';
				item.Unit = '%';
				item.MinMete = 0.00;
				item.MaxMete = 25.00;
				item.MinAlarm = 23.00;
				item.MaxAlarm = 0.00;
				item.HCutValue = 18.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			case 7:
				item.Location = 'WD五采区变电所';
				item.SensorTypeID = '6';
				item.SensorType = '温度';
				item.SensorDataID = '1';
				item.Unit = '℃';
				item.MinMete = 0.00;
				item.MaxMete = 50.00;
				item.MinAlarm = 40.00;
				item.MaxAlarm = 45.00;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			case 8:
				item.Location = 'WD14201工作面';
				item.SensorTypeID = '6';
				item.SensorType = '温度';
				item.SensorDataID = '1';
				item.Unit = '℃';
				item.MinMete = 0.00;
				item.MaxMete = 50.00;
				item.MinAlarm = 40.00;
				item.MaxAlarm = 45.00;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			case 9:
				item.Location = 'CO2避难硐室前门外';
				item.SensorTypeID = '2';
				item.SensorType = '二氧化碳';
				item.SensorDataID = '1';
				item.Unit = '%';
				item.MinMete = 0.00;
				item.MaxMete = 5.00;
				item.MinAlarm = 1.00;
				item.MaxAlarm = 0.00;
				item.HCutValue = 0.00;
				item.HResetValue = 0.00;
				item.LCutValue = 0.00;
				item.LResetValue = 0.00;
				break;
			default:
				break;
			}

			arr.push(item);
		}

		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}

	/**
	 * 取得传感器位置
	 */
	Sensor.prototype.getPosition = function() {
		var self = this;
		$.ajax({
			url : "/sensorposition",
			type : "GET",
			async : true,
			cache : false,
			dataType : "json",
			success : function(data) {
				if ($.isEmptyObject(data)) {
					return;
				}
				var length = data.length;
				for (var i = 0; i < length; i++) {
					var name = data[i].name;
					var x = data[i].x;
					var y = data[i].y;
					var point = new mxLib.Point(x, y);
					self.sensorPosition[name] = point;
				}
			},
			error : function(msg) {

			}
		});
	}

	/**
	 * 更新传感器位置
	 */
	Sensor.prototype.savePosition = function() {
		var data = [];
		for (var name in this.sensorPosition) {
			var point = this.sensorPosition[name];
			var x = point.x;
			var y = point.y;
			var position = {};
			position.name = name;
			position.x = x;
			position.y = y;
			data.push(position);
		}
		if (data.length > 0) {
			$.ajax({
				url : "/sensorposition",
				type : "POST",
				async : true,
				cache : false,
				contentType: "application/json",
				data: JSON.stringify(data),
				dataType : "json",
				success: function(data) {
					alert("保存成功！");
				},
				error: function(data) {
					
				}
			});
		}
		
		// 要删除的监测点
		var removedData = [];
		for (var name in this.removedSensorPosition) {
			var position = {};
			position.name = name;
			removedData.push(position);
		}
		if (removedData.length > 0) {
			$.ajax({
				url : "/sensorposition/remove",
				type : "POST",
				async : true,
				cache : false,
				contentType: "application/json",
				data: JSON.stringify(removedData),
				dataType : "json",
				success: function(data) {
				},
				error: function(data) {
				}
			});
		}
	}
	
	/**
	 * 添加一个传感器覆盖物
	 * 
	 * @param opts表示传入给对象的相关参数
	 */
	Sensor.prototype.addSensor = function(opts) {
		if ((typeof opts) == "string") {
			try {
				opts = $.parseJSON(opts);
			} catch (e) {
				return;
			}
		}

		// 判断是否有效
		if ($.isEmptyObject(opts)) {
			return;
		}

		// 如果opts没有下列属性则返回
		if (!opts.hasOwnProperty("SensorID")
				|| !opts.hasOwnProperty("SensorTypeID"))
			return;

		// 获取测点ID
		var sensorId = opts.SensorID;
		// 获取测点ID
		var typeId = opts.SensorTypeID;
		// 获取系统坐标x
		var x = opts.x;
		// 获取系统坐标y
		var y = opts.y;

		// 判断格式是否正确
		if (!($.isNumeric(x)) || !($.isNumeric(y))) {
			return;
		}

		// 根据类型判断图片基本路径
		var strBasePath = scriptBaseDir + "dataMine/image/";

		// 根据类测点型判断需要哪一张图片
		var strTotalPath = "";
		if (!$.isEmptyObject(imgNormalMap)) {

			// 获取测点对应的类型id
			var value = imgNormalMap[typeId];
			strTotalPath = strBasePath + value;
		}

		// 实时值
		var ssz = this.getValue(sensorId);
    	opts.ssz = ssz;
		var text = "";
		if (opts.hasOwnProperty("Unit")) {
			text = opts.ssz + opts.Unit;
		} else {
			text = opts.ssz;
		}

		// 构造html
		var html = '<div style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 36px; left: 0px; top: 0px; overflow: hidden;">'
				+ '<img id="rm3_image" style="border:none;left:0px; top:0px; position:absolute;" src="'
				+ strTotalPath
				+ '">'
				+ '</div>'
				+ '<label class=" BMapLabel" unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun bold; z-index: 80; color: rgb(30, 144, 255); left: 25px; top: 3px;">'
				+ text + '</label>';

		var point = new mxLib.Point(x, y);
		var myRichMarker = new mxLib.RichMarker(html, point, {
			"anchor" : new mxLib.Size(-18, -27),
			"enableDragging" : false
		});

		// 给覆盖物对象赋属性
		for ( var key in opts) {
			var value = opts[key];
			myRichMarker[key] = value;
		}

		// 查看是否存在指定对象
		var marker = this.sensorMap[sensorId];
		if ($.isEmptyObject(marker)) {
			// 如果测点没有对象则添加到图形中
			map.addOverlay(myRichMarker);
		} else {
			// 删除原先的对象
			map.removeOverlay(marker);
			// 添加到图形中
			map.addOverlay(myRichMarker);
		}

		// 添加到map
		this.sensorMap[sensorId] = myRichMarker;

		// 添加事件响应
		this.addEvent(myRichMarker);
	}

	/**
	 * 给所有测点添加事件
	 */
	Sensor.prototype.addEvent = function(marker) {
		if ($.isEmptyObject(marker)) {
			return;
		}

		// 传感器编号
		var sensorID = marker.SensorID;

		// 数据类型ID
		var sensorDataID = marker.SensorDataID;

		// 添加点击事件
		marker
				.addEventListener(
						"click",
						function() {
							// 信息窗口坐标
							var point = marker.getPosition();

							// 定义信息提示框
							var bFlag = true;
							var opts = {};
							if (sensorDataID == "1") {
								opts = {
									width : 200,
									height : 205,
									title : "测点定义信息查询"
								};
							} else {
								opts = {
									width : 200,
									height : 179,
									title : "测点定义信息查询"
								};
							}

							// 运用ifame框架
							var html = "<iframe frameborder=0  marginheight=0 marginwidth=0 width='100%' height='98%' src="
									+ scriptBaseDir
									+ "dataMine/html/PropertyTip.html?sensorID="
									+ sensorID + "></iframe>";

							// 弹出信息窗口
							var infoWindow = new mxLib.InfoWindow(map, html,
									opts);
							map.openInfoWindow(infoWindow, point);
						});

		var self = this;
		var menu1 = new mxLib.MenuItem("删除", scriptBaseDir
				+ "dataMine/image/删除.gif", "", function(e) {
			if (!$.isEmptyObject(window.sensor)) {
				var marker = self.sensorMap[sensorID];
				if (!$.isEmptyObject(marker)
						&& marker instanceof mxLib.RichMarker) {
					map.removeOverlay(marker);
					window.sensor.removePoint(sensorID);
				}
			}
		});
		var menu2 = new mxLib.MenuItem("拖动", scriptBaseDir
				+ "dataMine/image/编辑.png", "", function(e) {
			if (!$.isEmptyObject(window.sensor)) {
				var marker = self.sensorMap[sensorID];
				if (!$.isEmptyObject(marker)
						&& marker instanceof mxLib.RichMarker) {
					marker.enableDragging();
				}
			}
		});

		// 添加右键菜单
		var contextMenu = new mxLib.ContextMenu();
		contextMenu.appendItem(menu1);
		contextMenu.appendItem(menu2);

		// 添加到覆盖物
		marker.addContextMenu(contextMenu);

		// 覆盖物移动开始
		marker.addEventListener("ondragstart", function(e) {

		});
		// 覆盖物移动时
		marker.addEventListener("ondragging", function(e) {
			var point = marker.getPosition();
			console.log(point);
			marker.setPosition(point);
		});
		// 覆盖物移动时
		marker.addEventListener("ondragend", function(e) {

		});
	}

	/**
	 * 更新数据（定时器更新）
	 */
	Sensor.prototype.getData = function() {
		var self = this;
		$.ajax({
			url : "/sensordata",
			type : "GET",
			async : true,
			cache : false,
			dataType : "json",
			success : function(data) {
				if ($.isEmptyObject(data)) {
					return;
				}
				var length = data.length;
				for (var i = 0; i < length; i++) {
					var name = data[i].name;
					var value = data[i].value;
					self.sensorData[name] = value;
				}
				self.updateInternal();
			},
			error : function(msg) {

			}
		});
	}
	/**
	 * 取得实时值
	 */
	Sensor.prototype.getValue = function(sensorId) {
		var value = "";
		if (this.sensorData.hasOwnProperty(sensorId)) {
			value = this.sensorData[sensorId];
		}
		return value;
	}

	/**
	 * 设置实时值
	 */
	Sensor.prototype.updateInternal = function() {
		var self = this;
		for ( var i in self.sensorMap) {
			var sensorObj = self.sensorMap[i];
			if ($.isEmptyObject(sensorObj))
				continue;

			if (sensorObj.hasOwnProperty("SensorTypeID")
					&& sensorObj.hasOwnProperty("SensorID")) {
				// 传感器编号
				var sensorID = sensorObj.SensorID;
				// 类型编号
				var sensorTypeID = sensorObj.SensorTypeID;
				// 单位
				var unit = sensorObj.Unit;

				var value = "";
				if (this.sensorData.hasOwnProperty(sensorID)) {
					value = this.sensorData[sensorID];
				}
				// 如果为温度
				if (sensorTypeID == 6) {
					value += 20;
				}
				value += unit;
				// 修改实时值
				self.setValue(sensorID, value);
			}
		}
	}

	/**
	 * 设置测点实时值
	 * 
	 * @sensorId 传入的传感器编号
	 * @value 文本值
	 */
	Sensor.prototype.setValue = function(sensorId, value) {
		var marker = this.sensorMap[sensorId];
		if (!$.isEmptyObject(marker) && marker instanceof mxLib.RichMarker) {
			$(marker.getDomElement()).children("label").text(value);
		}
	}

	/**
	 * 更新坐标
	 * 
	 * @param sensorID测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.updatePoint = function(sensorID, point) {
		if ($.isEmptyObject(this.sensorPosition))
			return;
		this.sensorPosition[sensorID] = point;
	}

	/**
	 * 得到点坐标
	 * 
	 * @param sensorID测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.getPoint = function(sensorID) {
		if ($.isEmptyObject(this.sensorPosition))
			return null;

		if (this.sensorPosition.hasOwnProperty(sensorID)) {
			return this.sensorPosition[sensorID];
		} else {
			return null;
		}
	}

	/**
	 * 删除点坐标
	 * 
	 * @param sensorID测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.removePoint = function(sensorID) {
		if ($.isEmptyObject(this.sensorPosition))
			return null;

		if (this.sensorPosition.hasOwnProperty(sensorID)) {
			this.removedSensorPosition[sensorID] = this.sensorPosition[sensorID];
			delete this.sensorPosition[sensorID];
		}
	}

	/**
	 * 定位覆盖物对象
	 * 
	 * @pararm 测点ID
	 */
	Sensor.prototype.dolly = function(sensorID) {
		if (sensorID == "")
			return;

		var marker = this.sensorMap[sensorID];
		if ($.isEmptyObject(marker))
			return;

		// 临时使用
		var point = marker.getPosition();

		// 设置中心点
		window.map.setCenter(point);

		// 定位动画
		var size = new mxLib.Size(64, 64);
		var myIcon = new mxLib.Icon(scriptBaseDir + "dataMine/image/dolly.gif",
				new mxLib.Size(128, 128), {
					anchor : size
				});
		var alarmMarker = new mxLib.Marker(point, {
			icon : myIcon,
			shadowAniamte : false
		});

		// 添加覆盖物
		map.addOverlay(alarmMarker);

		// 添加定位覆盖物
		var sizeDolly = new mxLib.Size(8, 8);
		var myIconDolly = new mxLib.Icon(scriptBaseDir
				+ "dataMine/image/定位.png", new mxLib.Size(16, 16), {
			anchor : sizeDolly
		});
		var markerDolly = new mxLib.Marker(point, {
			icon : myIconDolly,
			shadowAniamte : false
		});

		// 添加覆盖物
		map.addOverlay(markerDolly);

		// 设置定时器
		window.setTimeout(function() {
			map.removeOverlay(markerDolly);
			map.removeOverlay(alarmMarker);
		}, 5000);
	}

	/**
	 * 从href中查询相关参数(?sysID=12&sensorID="001A01")
	 * 
	 * @param sHref网址
	 * @param 属性名称
	 * @return 返回值
	 */
	Sensor.prototype.getArgsFromHref = function(sHref, sArgName) {
		var args = sHref.split("?");
		var retval = "";

		if (args[0] == sHref) {
			return retval;
		}

		var str = args[1];
		args = str.split("&");
		for (var i = 0; i < args.length; i++) {
			str = args[i];
			var arg = str.split("=");
			if (arg.length <= 1)
				continue;
			if (arg[0] == sArgName)
				retval = arg[1];
		}

		return retval;
	}

})();