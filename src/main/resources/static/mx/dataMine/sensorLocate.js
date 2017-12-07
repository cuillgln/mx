/**
 * Sensor定位命令
 */
var LocateCmd =
mxLib.LocateCmd = function LocateCmd(name, parentCmd, opts, type) {
    mxLib.Command.prototype.constructor.call(this, name, parentCmd, opts);
    this.type = type;
    //如果为字符串
    if (typeof (opts) == "string") {
        try{
            this.opts = $.parseJSON(opts);
        }catch(e){
            return;
        }
    } else if (!$.isEmptyObject(opts)) {
        this.opts = opts;
    }
}
//继承自Command类
mxLib.Lang.inherits(LocateCmd, mxLib.Command);

LocateCmd.prototype.start = function (map) {
    mxLib.Command.prototype.start.call(this, map);
    var total = this.opts.total;
    var data = this.opts.rows;
    for (var i = 0; i < total; i++) {
    	var sensor = data[i];
    	if (this.type == 1) {
    		var sensorId = sensor.sensorId;
    	} else {
    		var sensorId = sensor.stationId;
    	}
    	var point = window.sensor.getPoint(sensorId, this.type);
    	if ($.isEmptyObject(point)) {
    		continue;
    	}
    	sensor.x = point.x;
    	sensor.y = point.y;
    	// sensor.systemId = point.systemId;
    	
    	// 判断x/y
    	var x = sensor.x;
        var y = sensor.y;
        if ($.isNumeric(x) && $.isNumeric(y)) {
        	sensor.deviceType = this.type;
        	window.sensor.addSensor(sensor);
        }
    }
    this.end(false);
}

LocateCmd.prototype.end = function (bCancel) {
    mxLib.Command.prototype.end.call(this, bCancel);
}