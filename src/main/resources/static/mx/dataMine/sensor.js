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
//粉尘
imgNormalMap[0] = "dust-normal.png";
// 甲烷
imgNormalMap[1] = "ch4-normal.png";
// 一氧化碳
imgNormalMap[2] = "co-normal.png";
// 温度
imgNormalMap[6] = "temparture-normal.png";
// 二氧化碳
imgNormalMap[16] = "co2-normal.png";
// 氧气
imgNormalMap[17] = "o2-normal.png";
// 开关
imgNormalMap[100] = "switch-normal.png";

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
	 * 加载传感器基本数据
	 */
	Sensor.prototype.getSensorInfo = function() {
		var arr = [];
		$.ajax({
			url : contextPath + "/sensor",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				arr = data;
			}
		});
		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}
	
	Sensor.prototype.getSafetyMonitoringStation = function() {
		var arr = [];
		$.ajax({
			url : contextPath + "/safetymonitoringstation",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				arr = data;
			}
		});
		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}
	
	Sensor.prototype.getStaffPositioningStation = function() {
		var arr = [];
		$.ajax({
			url : contextPath + "/staffpositioningstation",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				arr = data;
			}
		});
		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}
	
	Sensor.prototype.getAudioBroadcastingStation = function() {
		var arr = [];
		$.ajax({
			url : contextPath + "/audiobroadcastingstation",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				arr = data;
			}
		});
		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}
	
	/**
	 * 更新数据（定时器更新）
	 */
	Sensor.prototype.getData = function() {
		var self = this;
		$.ajax({
			url : contextPath + "/sensordata",
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
					var sensorId = data[i].sensorId;
					var valueObj = {};
					valueObj.value = data[i].value;
					valueObj.alarmFlag = data[i].alarmFlag;
					self.sensorData[sensorId] = valueObj;
				}
				self.updateInternal();
			},
			error : function(msg) {

			}
		});
	}
	
	// 设置实时值
	Sensor.prototype.updateInternal = function() {
		var self = this;
		for ( var i in self.sensorMap) {
			var sensorObj = self.sensorMap[i];
			if ($.isEmptyObject(sensorObj))
				continue;

			if (sensorObj.hasOwnProperty("sensorId")) {
				// 传感器编号
				// 单位
				var sensorId = sensorObj.sensorId;
				var unit = sensorObj.unit;

				var value = "";
				var alarmFlag = 0;
				if (this.sensorData.hasOwnProperty(sensorId)) {
					var valueObj = this.sensorData[sensorId];
					value = valueObj.value;
					alarmFlag = valueObj.alarmFlag;
				}
				value += unit;
				var analogFlag = sensorObj.analogFlag;
				if (analogFlag == 0) {
					if (value == "0") {
						value = sensorObj.offName;
					} else {
						value = sensorObj.onName;
					}
				}
				// 修改实时值
				self.setValue(sensorId, value, alarmFlag);
			}
		}
	}

	/**
	 * 加载传感器位置
	 */
	Sensor.prototype.getPosition = function(type) {
		var self = this;
		$.ajax({
			url : contextPath + "/sensorposition/list/1",
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
					var sensor = data[i];
					var sensorId = sensor.sensorId;
					var point = new mxLib.Point(sensor.x, sensor.y);
					point.systemId = sensor.systemId;
					self.sensorPosition[sensorId] = point;
				}
			},
			error : function(msg) {

			}
		});
	}

	/**
	 * 保存传感器位置
	 */
	Sensor.prototype.savePosition = function() {
		var data = [];
		for ( var sensorId in this.sensorPosition) {
			var point = this.sensorPosition[sensorId];
			var position = {};
			position.sensorId = sensorId;
			position.id = point.systemId;
			position.x = point.x;
			position.y = point.y;
			data.push(position);
		}
		if (data.length > 0) {
			$.ajax({
				url : contextPath + "/sensorposition/update/1",
				type : "POST",
				async : true,
				cache : false,
				contentType : "application/json",
				data : JSON.stringify(data),
				dataType : "json",
				success : function(data) {
					alert("保存成功！");
				},
				error : function(data) {

				}
			});
		}

		// 要删除的监测点
		var removedData = [];
		for ( var sensorId in this.removedSensorPosition) {
			var point = this.removedSensorPosition[sensorId];
			var position = {};
			position.sensorId = sensorId;
			position.id = point.systemId;
			position.x = point.x;
			position.y = point.y;
			removedData.push(position);
		}
		if (removedData.length > 0) {
			$.ajax({
				url : contextPath + "/sensorposition/remove",
				type : "POST",
				async : true,
				cache : false,
				contentType : "application/json",
				data : JSON.stringify(removedData),
				dataType : "json",
				success : function(data) {
				},
				error : function(data) {
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
		if (!opts.hasOwnProperty("sensorId")
				|| !opts.hasOwnProperty("sensorType"))
			return;

		// 获取测点ID 坐标x/y
		var sensorId = opts.sensorId;
		var x = opts.x;
		var y = opts.y;
		if (!($.isNumeric(x)) || !($.isNumeric(y))) {
			return;
		}
		var point = new mxLib.Point(x, y);
		point.systemId = opts.systemId;

		// 根据类型判断图片基本路径
		// 根据类测点型判断需要哪一张图片
		var typeId = opts.sensorType;
		var strBasePath = scriptBaseDir + "dataMine/image/";
		var strTotalPath = "";
		if (!$.isEmptyObject(imgNormalMap)) {
			// 获取测点对应的类型id
			var imagName = imgNormalMap[typeId];
			if (!$.isEmptyObject(imagName)) {
				strTotalPath = strBasePath + imagName;
			} else {
				strTotalPath = strBasePath + "";
			}
		}

		// 构造html 无实时值
		var html = '<div style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 36px; left: 0px; top: 0px; overflow: hidden;">'
				+ '<img id="rm3_image" style="border:none;left:0px; top:0px; position:absolute;" src="'
				+ strTotalPath
				+ '"/></div>'
				+ '<label class=" BMapLabel" unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun bold; z-index: 80; color: rgb(30, 144, 255); left: 25px; top: 3px;"></label>';

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
		this.updatePoint(sensorId, point);

		// 实时值
		var valueObj = this.getValue(sensorId);
		var value = "";
		var unit = "";
		var alarmFlag = 0;
		if (opts.hasOwnProperty("unit")) {
			unit = opts.unit;
		}
		if (valueObj.hasOwnProperty("value") && valueObj.hasOwnProperty("alarmFlag")) {
			value = valueObj.value;
			alarmFlag = valueObj.alarmFlag;
			value += unit;
		}
		var analogFlag = opts.analogFlag;
		if (analogFlag == 0) {
			if (value == "0") {
				value = opts.offName;
			} else {
				value = opts.onName;
			}
		}
		myRichMarker.value = value;
		myRichMarker.alarmFlag = 0; // 初始是normal
		this.setValue(sensorId, value, alarmFlag);
		
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
		var sensorId = marker.sensorId;

		// 添加点击事件
		marker
				.addEventListener(
						"click",
						function() {
							// 信息窗口坐标
							var point = marker.getPosition();

							// 定义信息提示框
							var bFlag = true;
							var opts = {
								width : 240,
								height : 230,
								title : "传感器信息查询"
							};

							var sensorInfoUrl = contextPath + "/sensorinfo?sensorId=" + sensorId;
							// 运用ifame框架
							var html = "<iframe frameborder=0  marginheight=0 marginwidth=0 width='100%' height='98%' src='"
								+ sensorInfoUrl + "'></iframe>";

							// 弹出信息窗口
							var infoWindow = new mxLib.InfoWindow(map, html, opts);
							map.openInfoWindow(infoWindow, point);
						});

		var self = this;
		var menu1 = new mxLib.MenuItem("删除", scriptBaseDir
				+ "dataMine/image/del.gif", "", function(e) {
			if (!$.isEmptyObject(window.sensor)) {
				var marker = self.sensorMap[sensorId];
				if (!$.isEmptyObject(marker)
						&& marker instanceof mxLib.RichMarker) {
					map.removeOverlay(marker);
					window.sensor.removePoint(sensorId);
				}
			}
		});
		var menu2 = new mxLib.MenuItem("拖动", scriptBaseDir
				+ "dataMine/image/edit.png", "", function(e) {
			if (!$.isEmptyObject(window.sensor)) {
				var marker = self.sensorMap[sensorId];
				if (!$.isEmptyObject(marker)
						&& marker instanceof mxLib.RichMarker) {
					marker.enableDragging();
					marker.addEventListener("onmouseup", function(e) {
						// 更新坐标位置
						var point = e.point;
						self.updatePoint(sensorId, point);
						marker.disableDragging();
					});
				}
			}
		});

		// 添加右键菜单
		// 添加到覆盖物
		var contextMenu = new mxLib.ContextMenu();
		contextMenu.appendItem(menu1);
		contextMenu.appendItem(menu2);
		marker.addContextMenu(contextMenu);
	}

	/**
	 * 取得实时值
	 */
	Sensor.prototype.getValue = function(sensorId) {
		var value = {};
		if (this.sensorData.hasOwnProperty(sensorId)) {
			value = this.sensorData[sensorId];
		}
		return value;
	}
	
	/**
	 * 设置测点实时值
	 */
	Sensor.prototype.setValue = function(sensorId, value, alarmFlag) {
		var marker = this.sensorMap[sensorId];
		if (!$.isEmptyObject(marker) && marker instanceof mxLib.RichMarker) {
			$(marker.getDomElement()).children("label").text(value);
			// 更换报警图片
			var srcUrl = $(marker.getDomElement()).children("div").children("img").attr("src");
			if (marker.alarmFlag != alarmFlag) {
				if (alarmFlag == 1) {
					srcUrl = srcUrl.replace("normal", "alarm");
				} else if (alarmFlag == 0) {
					srcUrl = srcUrl.replace("alarm", "normal");
				}
				$(marker.getDomElement()).children("div").children("img").attr("src", srcUrl);
				marker.alarmFlag = alarmFlag; // 更新marker的alarmFlag
			}
		}
	}

	/**
	 * 更新坐标
	 * 
	 * @param sensorId测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.updatePoint = function(sensorId, point) {
		if (this.sensorPosition.hasOwnProperty(sensorId)) {
			var oldPoint = this.sensorPosition[sensorId];
			point.systemId = oldPoint.systemId;
		}
		this.sensorPosition[sensorId] = point;
	}

	/**
	 * 得到点坐标
	 * 
	 * @param sensorId测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.getPoint = function(sensorId) {
		if ($.isEmptyObject(this.sensorPosition))
			return null;

		if (this.sensorPosition.hasOwnProperty(sensorId)) {
			return this.sensorPosition[sensorId];
		}
	}

	/**
	 * 删除点坐标
	 * 
	 * @param sensorId测点编号
	 * @param point点坐标
	 * @return 返回json格式的数据项
	 */
	Sensor.prototype.removePoint = function(sensorId) {
		if ($.isEmptyObject(this.sensorPosition))
			return null;

		if (this.sensorPosition.hasOwnProperty(sensorId)) {
			this.removedSensorPosition[sensorId] = this.sensorPosition[sensorId];
			delete this.sensorPosition[sensorId];
		}
	}

	/**
	 * 定位覆盖物对象
	 * 
	 * @pararm 测点ID
	 */
	Sensor.prototype.dolly = function(sensorId) {
		if (sensorId == "")
			return;

		var marker = this.sensorMap[sensorId];
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
				+ "dataMine/image/locate.png", new mxLib.Size(16, 16), {
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

})();