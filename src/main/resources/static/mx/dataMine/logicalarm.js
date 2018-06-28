(function() {
	var LogicAlarm = mxLib.LogicAlarm = function() {
		this.timeTask = null;
		this.opts = {
				offset:
				{
					from: "bottom",
					amount: 10
				},
				align: "center",
				minWidth: 50,
				maxWidth: 800,
				delay: 3000,
				allowDismiss: false,
				spacing: 10
				};
	}

	LogicAlarm.prototype.getLogicAlarm = function() {
		var self = this;
		$.ajax({
			url : contextPath + "/logicAlarm",
			type : "GET",
			async : false,
			dataType : "html",
			success : function(data) {
				console.log(data);
				mxLib.Util.toastWarn(data, self.opts);
			}
		});
	}

	LogicAlarm.prototype.autoRefresh = function() {
		this.getLogicAlarm();
		window.clearInterval(this.timeTask);
		var self = this;
		this.timeTask = window.setInterval(function() {
			self.getLogicAlarm();
		}, 5000);
	}
})();
