(function() {
	var Sensor = mxLib.Sensor = function() {
		this.markerMap = {}; // sensorId -> RichMarker
		this.positionMap = {}; // sensorId -> Point
		this.valueMap = {}; // sensorId -> Realtime Value
		this.removedMap = {}; // sensorId -> Point 删除的位置点
		this.timeTask = null;
	}

	/**
	 * 加载位置
	 */
	Sensor.prototype.getPosition = function() {
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
					var station = data[i];
					var sensorId = station.sensorId;
					var point = new mxLib.Point(station.x, station.y);
					point.systemId = station.id;
					self.positionMap[sensorId] = point;
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
		var positionData = [];
		for ( var sensorId in this.positionMap) {
			var point = this.positionMap[sensorId];
			var position = {};
			position.sensorId = sensorId;
			position.id = point.systemId;
			position.x = point.x;
			position.y = point.y;
			positionData.push(position);
		}
		if (positionData.length > 0) {
			$.ajax({
				url : contextPath + "/sensorposition/update/1",
				type : "POST",
				async : true,
				cache : false,
				contentType : "application/json",
				data : JSON.stringify(positionData),
				dataType : "json",
				success : function() {
				},
				error : function() {

				}
			});
		}

		// 删除的点
		var removedData = [];
		for ( var sensorId in this.removedMap) {
			var point = this.removedMap[sensorId];
			var position = {};
			position.sensorId = sensorId;
			position.id = point.systemId;
			position.type = 1;
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

	Sensor.prototype.getSensor = function() {
		var self = this;
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

	/**
	 * 更新数据（定时器更新）
	 */
	Sensor.prototype.getSensorValue = function() {
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
					self.valueMap[sensorId] = valueObj;
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
		for ( var i in self.markerMap) {
			var sensorObj = self.markerMap[i];
			if ($.isEmptyObject(sensorObj))
				continue;

			if (sensorObj.hasOwnProperty("sensorId")) {
				// 传感器编号
				// 单位
				var sensorId = sensorObj.sensorId;
				var unit = sensorObj.unit;

				var value = "";
				var alarmFlag = 0;
				if (this.valueMap.hasOwnProperty(sensorId)) {
					var valueObj = this.valueMap[sensorId];
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

	Sensor.prototype.setValue = function(sensorId, value, alarmFlag) {
		var marker = this.markerMap[sensorId];
		if (!$.isEmptyObject(marker) && marker instanceof mxLib.RichMarker) {
			$(marker.getDomElement()).children("label").text(value);
			// 更换报警图片
			var srcUrl = $(marker.getDomElement()).children("div").children(
					"img").attr("src");
			if (marker.alarmFlag != alarmFlag) {
				if (alarmFlag == 1) {
					srcUrl = srcUrl.replace("normal", "alarm");
				} else if (alarmFlag == 0) {
					srcUrl = srcUrl.replace("alarm", "normal");
				}
				$(marker.getDomElement()).children("div").children("img").attr(
						"src", srcUrl);
				marker.alarmFlag = alarmFlag; // 更新marker的alarmFlag
			}
		}
	}

	Sensor.prototype.addMarker = function(opts) {
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

		// 根据测点名称确定张图片
		// var typeId = opts.sensorName;
		var typeId = opts.sensorType;
		var strBasePath = scriptBaseDir + "dataMine/image/";
		var strTotalPath = strBasePath + typeId + "-normal.png";

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
		var marker = this.markerMap[sensorId];
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
		this.markerMap[sensorId] = myRichMarker;
		this.updatePoint(sensorId, point);

		// 实时值
		var valueObj = this.getValue(sensorId);
		var value = "";
		var unit = "";
		var alarmFlag = 0;
		if (opts.hasOwnProperty("unit")) {
			unit = opts.unit;
		}
		if (valueObj.hasOwnProperty("value")
				&& valueObj.hasOwnProperty("alarmFlag")) {
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

	Sensor.prototype.updatePoint = function(sensorId, point) {
		if (this.positionMap.hasOwnProperty(sensorId)) {
			var oldPoint = this.positionMap[sensorId];
			point.systemId = oldPoint.systemId;
		}
		this.positionMap[sensorId] = point;
	}

	Sensor.prototype.removePoint = function(sensorId) {
		var marker = this.markerMap[sensorId];
		if (!$.isEmptyObject(marker) && marker instanceof mxLib.RichMarker) {
			map.removeOverlay(marker);
			if ($.isEmptyObject(this.positionMap)) {
				return;
			}

			if (this.positionMap.hasOwnProperty(sensorId)) {
				this.removedMap[sensorId] = this.positionMap[sensorId];
				delete this.positionMap[sensorId];
			}
		}
	}

	Sensor.prototype.getPoint = function(sensorId) {
		if ($.isEmptyObject(this.positionMap)) {
			return null;
		}
		if (this.positionMap.hasOwnProperty(sensorId)) {
			return this.positionMap[sensorId];
		}
	}

	Sensor.prototype.getValue = function(sensorId) {
		var value = {};
		if (this.valueMap.hasOwnProperty(sensorId)) {
			value = this.valueMap[sensorId];
		}
		return value;
	}

	Sensor.prototype.addEvent = function(marker) {
		if ($.isEmptyObject(marker)) {
			return;
		}

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
								title : "详细信息"
							};

							// 运用ifame框架
							var sensorInfoUrl = contextPath
									+ "/sensorinfo?sensorId=" + sensorId
									+ "&deviceType=1";
							var html = "<iframe frameborder=0  marginheight=0 marginwidth=0 width='100%' height='98%' src='"
									+ sensorInfoUrl + "'></iframe>";
							// 弹出信息窗口
							var infoWindow = new mxLib.InfoWindow(map, html,
									opts);
							map.openInfoWindow(infoWindow, point);
						});

		var self = this;
		var menu1 = new mxLib.MenuItem("删除", scriptBaseDir
				+ "dataMine/image/del.gif", "", function(e) {
			self.removePoint(sensorId);
		});
		var menu2 = new mxLib.MenuItem("拖动", scriptBaseDir
				+ "dataMine/image/edit.png", "",
				function(e) {
					var marker = self.markerMap[sensorId];
					if (!$.isEmptyObject(marker)
							&& marker instanceof mxLib.RichMarker) {
						marker.enableDragging();
						marker.addEventListener("onmouseup", function(e) {
							// 更新坐标位置
							self.updatePoint(sensorId, e.point);
							marker.disableDragging();
						});
					}
				});

		// 添加右键菜单
		// 添加到覆盖物
		var contextMenu = new mxLib.ContextMenu();
		contextMenu.appendItem(menu1);
		contextMenu.appendItem(menu2);
		marker.addContextMenu(contextMenu);
	}

	// 定位
	Sensor.prototype.dolly = function(sensorId) {
		if (sensorId == "")
			return;

		var marker = this.markerMap[sensorId];
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

	Sensor.prototype.autoRefresh = function() {
		this.getSensorValue();
		window.clearInterval(this.timeTask);
		var self = this;
		this.timeTask = window.setInterval(function() {
			self.getSensorValue();
		}, 5000);
	}
})();