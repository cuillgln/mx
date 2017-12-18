(function() {
	var History = mxLib.History = function() {
		this.polyline = null;
		this.animateId = null;
	}
	
	History.prototype.getPathData = function(rfId, begin, end) {
		var self = this;
		$.ajax({
			url : contextPath + "/staff/history?rfId=" + rfId + "&begin=" + begin + "&end=" + end,
			// url : contextPath + "/staff/history?rfId=45&begin=2014-03-20&end=2014-04-21",
			type : "GET",
			async : false,
			dataType : "json",
			success : function(data) {
				var points = [];
				for (var i = 0; i < data.length; i++) {
					var point = data[i].point;
					points.push(new mxLib.Point(data[i].x, data[i].y));
				}
				if (self.polyline) {
					map.removeOverlay(self.polyline);
				}
				if (self.animateId) {
					canvasLayer.deletePathAnimate(self.animateId);
				}
				if (points.length > 1) {
					self.polyline = new mxLib.Polyline(points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
					map.addOverlay(self.polyline);
					self.animateId = canvasLayer.addPathAnimate(points, { fillColor: "red", time: 20, arrowScale: 10000, minZoom: 0, maxZoom: 0, zoomNoScale:true });
				}
			}
		});
	}
})();