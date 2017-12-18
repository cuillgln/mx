(function() {
	/**
	 * @exports Data as mxLib.Data
	 */
	var Station =
	/**
	 * Data类的构造函数 sensor传感器对象
	 */
	mxLib.Station = function() {
		this.drawCmd = null;
		this.startStation = null;
		this.stopStation = null;
	}

	// 路径
	Station.prototype.addPath = function(startStation, stopStation) {
		map.clearOverlays();
		this.startStation = startStation;
		this.stopStation = stopStation;
		this.drawCmd = new mxLib.DrawPolylineCommand('', null, null);
		map.startCommand(this.drawCmd);
	}

	// 路径
	Station.prototype.savePath = function() {
		if (this.drawCmd && this.drawCmd.points.length > 0) {
			this.drawCmd.points.pop();
			this.drawCmd.points.pop();
			$.ajax({
				url : contextPath + "/path/save?start=" + this.startStation
						+ "&stop=" + this.stopStation,
				type : "POST",
				async : true,
				cache : false,
				contentType : "application/json",
				data : JSON.stringify(this.drawCmd.points),
				dataType : "json",
				success : function(data) {
					alert(data.result);
				},
				error : function() {

				}
			});
		}
	}

	// 路径
	Station.prototype.delPath = function(startStation, stopStation) {

	}

})();