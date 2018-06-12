/**
 * Sensor定位命令
 */
var LocateCmd =
mxLib.LocateCmd = function LocateCmd(name, parentCmd, opts, type) {
    mxLib.Command.prototype.constructor.call(this, name, parentCmd, opts);
    this.deviceType = type;
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
    	var deviceType = this.deviceType;
    	var sensor = data[i];
        switch (deviceType) {
    	case 2:
    		var stationId = sensor.stationId;
    		var point = window.smstation.getPoint(stationId);
    		if ($.isEmptyObject(point)) {
        		continue;
        	}
    		sensor.x = point.x;
        	sensor.y = point.y;
            if ($.isNumeric(sensor.x) && $.isNumeric(sensor.y)) {
            	window.smstation.addMarker(sensor);
            }
    		break;
    	case 3:
    		var stationId = sensor.stationId;
    		var point = window.spstation.getPoint(stationId);
    		if ($.isEmptyObject(point)) {
        		continue;
        	}
    		sensor.x = point.x;
        	sensor.y = point.y;
            if ($.isNumeric(sensor.x) && $.isNumeric(sensor.y)) {
            	window.spstation.addMarker(sensor);
            }
    		break;
    	case 4:
    		var stationId = sensor.stationId;
    		var point = window.abstation.getPoint(stationId);
    		if ($.isEmptyObject(point)) {
        		continue;
        	}
    		sensor.x = point.x;
        	sensor.y = point.y;
            if ($.isNumeric(sensor.x) && $.isNumeric(sensor.y)) {
            	window.abstation.addMarker(sensor);
            }
    		break;
    	case 5:
    		var hubId = sensor.hubId;
    		var point = window.hub.getPoint(hubId);
    		if ($.isEmptyObject(point)) {
        		continue;
        	}
    		sensor.x = point.x;
        	sensor.y = point.y;
        	if ($.isNumeric(sensor.x) && $.isNumeric(sensor.y)) {
            	window.hub.addMarker(sensor);
            }
    		break;
    	default:
    		var sensorId = sensor.sensorId;
    		var point = window.sensor.getPoint(sensorId);
    		if ($.isEmptyObject(point)) {
        		continue;
        	}
    		sensor.x = point.x;
        	sensor.y = point.y;
            if ($.isNumeric(sensor.x) && $.isNumeric(sensor.y)) {
            	window.sensor.addMarker(sensor);
            }
    		break;
    	}
    }
    this.end(false);
}

LocateCmd.prototype.end = function (bCancel) {
    mxLib.Command.prototype.end.call(this, bCancel);
}