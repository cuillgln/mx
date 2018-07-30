(function() {
	var Vehicle = mxLib.Vehicle = function() {
		this.timeTask = null;
		this.pointCollection = null;
	}
	
	Vehicle.prototype.getVehicle = function() {
		var self = this;
		var arr = [];
		$.ajax({
			url : contextPath + "/vehicle/list",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				arr = data;
				var mapBounds = map.getBounds();
				var points = [];  // 添加海量点数据
				for (var i = 0; i < data.length; i++) {
					var point = new mxLib.Point();
				    point.x  = mapBounds.width * Math.random() + mapBounds.getLeftBottom().x;
				    point.y = mapBounds.height * Math.random() + mapBounds.getLeftBottom().y;
					points.push(point);
				}
				 
				if (self.pointCollection == null) {
					self.pointCollection = new mxLib.PointCollection(points, new mxLib.Icon(MX_Icon_SHAPE_DROP_RED));  // 初始化PointCollection
					self.pointCollection.addEventListener('click', function (e) {
					    mxLib.Util.toastInfo('单击点的坐标为：' + e.point.x + ',' + e.point.y);  // 监听点击事件
					});
					map.addOverlay(self.pointCollection);
				} else {
					self.pointCollection.clear();
					self.pointCollection.setPoints(points);
					self.pointCollection.refresh();
				}
			}
		});
		// 如果数组大于0
		if (arr.length > 0) {
			return arr;
		}
	}

	Vehicle.prototype.autoRefresh = function() {
		window.clearInterval(this.timeTask);
		var self = this;
		this.timeTask = window.setInterval(function() {
			self.getVehicle();
		}, 5000);
	}
})();