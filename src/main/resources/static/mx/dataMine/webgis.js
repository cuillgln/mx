function sensorSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.sensor.savePosition()");
}

function loadSensor() {
	MetaMapX.CurViewEvaluateJavaScript("window.sensor.getPosition()");
	MetaMapX.CurViewEvaluateJavaScript("window.sensor.autoRefresh()");
	var sensor = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getSensor()");
	
	if (sensor == "" || sensor == null){
		return;
	}
    var sensorArr = [];
    try {
    	sensorArr = $.parseJSON(sensor);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = sensorArr.length;
    json.rows = sensorArr;
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "', 1); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);
    
    $('#sensor').datagrid({
        remoteSort: false,
        singleSelect: true,
        nowrap: false,
        fitColumns: true,
        loadMsg: '数据正在加载,请耐心的等待...',
        striped: true,
        columns: [[
            { field: 'systemId', title: '系统序号', width: 100, align: 'center', hidden:true},
            { field: 'sensorId', title: '测点编号', width: 100, align: 'center', hidden:true},
            { field: 'stationPort', title: '端口号', width: 40, align: 'center'},
            { field: 'sensorName', title: '传感器名称', width: 75, align: 'center'},
            { field: 'sensorType', title: '传感器类型', width: 75, align: 'center', hidden: true},
            { field: 'location', title: '安装地点', width: 120, align: 'center' },
            { field: 'analogFlag', title: '模拟量', width: 75, align: 'center', hidden: true},
            { field: 'offName', title: '停显示', width: 75, align: 'center', hidden: true},
            { field: 'onName', title: '开显示', width: 75, align: 'center', hidden: true},
            { field: 'unit', title: '单位', width: 75, align: 'center', hidden: true},
            { field: 'alarmValueRange', title: '报警值', width: 90, align: 'center', hidden: true},
            { field: 'alarmMinValue', title: '报警下限', width: 90, align: 'center', hidden: true},
            { field: 'alarmMaxValue', title: '报警上限', width: 90, align: 'center', hidden: true},
            { field: 'powerCutValue', title: '断电值', width: 90, align: 'center', hidden: true},
            { field: 'powerCutPort', title: '断电控制端口', width: 90, align: 'center', hidden: true},
            { field: 'powerCutRange', title: '断电控制区域', width: 90, align: 'center', hidden: true},
            { field: 'alarmLevelFlag', title: '是否分级报警', width: 90, align: 'center', hidden: true},
            { field: 'alarmLevelRange', title: '分级报警设置', width: 90, align: 'center', hidden: true},
            { field: 'alarmLevelString', title: '分级联动字串', width: 90, align: 'center', hidden: true},
            { field: 'x', title: 'x坐标', width: 30, align: 'center', hidden: true},
            { field: 'y', title: 'y坐标', width: 30, align: 'center', hidden: true},
            {
                field: 'pick',
                title: '拾取',
                width: 30,
                align: 'center',
                formatter: function (value, row, index) {
                    return '<img src="mx/dataMine/image/pick.png"/>';
                }
            }
        ]]
    });

    //单击列事件
    $('#sensor').datagrid({
        onDblClickRow: function (index, row) {
            var stationId = row.stationId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + stationId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#sensor').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow)) {
                	return;
                }
              //构造对象
                var opts = {};
                opts.SysID = curRow["SysID"];
                opts.systemId = curRow["systemId"];
                opts.sensorId = curRow["sensorId"];
                opts.sensorName = curRow["sensorName"];
                opts.sensorType = curRow["sensorType"];
                opts.location = curRow["location"];
                opts.stationPort = curRow["stationPort"];
                opts.analogFlag = curRow["analogFlag"];
                opts.offName = curRow["offName"];
                opts.onName = curRow["onName"];
                opts.unit = curRow["unit"];
                opts.alarmValueRange = curRow["alarmValueRange"];
                opts.alarmMinValue = curRow["alarmMinValue"];
                opts.alarmMaxValue = curRow["alarmMaxValue"];
                opts.powerCutValue = curRow["powerCutValue"];
                opts.powerCutPort = curRow["powerCutPort"];
                opts.powerCutRange = curRow["powerCutRange"];
                opts.alarmLevelFlag = curRow["alarmLevelFlag"];
                opts.alarmLevelRange = curRow["alarmLevelRange"];
                opts.alarmLevelString = curRow["alarmLevelString"];
                opts.deviceType = 1;
                
                var strOpts = "";
                try{
                    strOpts = JSON.stringify(opts);
                } catch (e) {
                    return;
                }

                var script = "var pickCmd = new mxLib.PickCmd('', null, '" + strOpts + "'); map.startCommand(pickCmd);"
                //执行拾取命令(命令写法参照说明文档,脚本文件sensorPick.js由view层LoadMxLib加载)
                MetaMapX.CurViewEvaluateJavaScript(script);
            }
        }
    });

    //加载数据
    $('#sensor').datagrid('loadData', json);
    $('#sensor').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function smstationSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.smstation.savePosition()");
}

function loadSmstation() {
	MetaMapX.CurViewEvaluateJavaScript("window.smstation.getPosition()");
	MetaMapX.CurViewEvaluateJavaScript("window.smstation.autoRefresh()");
	var station = MetaMapX.CurViewEvaluateJavaScript("window.smstation.getStation()");
	
	if (station == "" || station == null){
		return;
	}
    var stationArr = [];
    try {
    	stationArr = $.parseJSON(station);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = stationArr.length;
    json.rows = stationArr;
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "', 2); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);
    
    $('#sms').datagrid({
        remoteSort: false,
        singleSelect: true,
        nowrap: false,
        fitColumns: true,
        loadMsg: '数据正在加载,请耐心的等待...',
        striped: true,
        columns: [[
            { field: 'systemId', title: '系统序号', width: 100, align: 'center', hidden:true},
            { field: 'stationId', title: '分站ID', width: 100, align: 'center', hidden:true},
            { field: 'station', title: '分站地址', width: 40, align: 'center'},
            { field: 'stationName', title: '分站名称', width: 75, align: 'center'},
            { field: 'location', title: '安装地点', width: 120, align: 'center' },
            { field: 'runningState', title: '运行状态', width: 90, align: 'center', hidden: true},
            { field: 'powerCutFlag', title: '是否就地断电', width: 90, align: 'center', hidden: true},
            { field: 'ch4LockFlag', title: '是否风电瓦斯闭锁', width: 90, align: 'center', hidden: true},
            { field: 'portName', title: '开出端口名称', width: 90, align: 'center', hidden: true},
            { field: 'feedMonitor', title: '馈电关联监测', width: 90, align: 'center', hidden: true},
            { field: 'value', title: 'Value', width: 120, align: 'center', hidden: true},
            { field: 'alarmFlag', title: 'AlarmFlag', width: 120, align: 'center', hidden: true},
            { field: 'x', title: 'x坐标', width: 30, align: 'center', hidden: true},
            { field: 'y', title: 'y坐标', width: 30, align: 'center', hidden: true},
            {
                field: 'pick',
                title: '拾取',
                width: 30,
                align: 'center',
                formatter: function (value, row, index) {
                    return '<img src="mx/dataMine/image/pick.png"/>';
                }
            }
        ]]
    });

    //单击列事件
    $('#sms').datagrid({
        onDblClickRow: function (index, row) {
            var stationId = row.stationId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("smstation.dolly('" + stationId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#sms').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow)) {
                	return;
                }
                //构造对象
                var opts = {};
                opts.SysID = curRow["SysID"];
                opts.systemId = curRow["systemId"];
                opts.stationId = curRow["stationId"];
                opts.station = curRow["station"];
                opts.stationName = curRow["stationName"];
                opts.location = curRow["location"];
                opts.runningState = curRow["runningState"];
                opts.powerCutFlag = curRow["powerCutFlag"];
                opts.ch4LockFlag = curRow["ch4LockFlag"];
                opts.portName = curRow["portName"];
                opts.feedMonitor = curRow["feedMonitor"];
                opts.alarmFlag = curRow["alarmFlag"];
                opts.value = curRow["value"];
                opts.deviceType = 2;
                
                var strOpts = "";
                try{
                    strOpts = JSON.stringify(opts);
                } catch (e) {
                    return;
                }

                var script = "var pickCmd = new mxLib.PickCmd('', null, '" + strOpts + "'); map.startCommand(pickCmd);"
                //执行拾取命令(命令写法参照说明文档,脚本文件sensorPick.js由view层LoadMxLib加载)
                MetaMapX.CurViewEvaluateJavaScript(script);
            }
        }
    });

    //加载数据
    $('#sms').datagrid('loadData', json);
    $('#sms').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function spstationSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.spstation.savePosition()");
}

function loadSpstation() {
	MetaMapX.CurViewEvaluateJavaScript("window.spstation.getPosition()");
	MetaMapX.CurViewEvaluateJavaScript("window.spstation.autoRefresh()");
	var station = MetaMapX.CurViewEvaluateJavaScript("window.spstation.getStation()");
	
	if (station == "" || station == null){
		return;
	}
    var stationArr = [];
    try {
    	stationArr = $.parseJSON(station);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = stationArr.length;
    json.rows = stationArr;
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "', 3); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);
    
    $('#sps').datagrid({
        remoteSort: false,
        singleSelect: true,
        nowrap: false,
        fitColumns: true,
        loadMsg: '数据正在加载,请耐心的等待...',
        striped: true,
        columns: [[
            { field: 'systemId', title: '系统序号', width: 100, align: 'center', hidden:true},
            { field: 'stationId', title: '分站ID', width: 100, align: 'center', hidden:true},
            { field: 'station', title: '分站地址', width: 40, align: 'center'},
            { field: 'stationName', title: '分站名称', width: 75, align: 'center'},
            { field: 'location', title: '安装地点', width: 120, align: 'center'},
            { field: 'staffCount', title: '周围人员数', width: 120, align: 'center', hidden: true},
            { field: 'staff', title: '周围人员', width: 120, align: 'center', hidden: true},
            { field: 'value', title: 'Value', width: 120, align: 'center', hidden: true},
            { field: 'alarmFlag', title: 'AlarmFlag', width: 120, align: 'center', hidden: true},
            { field: 'x', title: 'x坐标', width: 30, align: 'center', hidden: true},
            { field: 'y', title: 'y坐标', width: 30, align: 'center', hidden: true},
            {
                field: 'pick',
                title: '拾取',
                width: 30,
                align: 'center',
                formatter: function (value, row, index) {
                    return '<img src="mx/dataMine/image/pick.png"/>';
                }
            }
        ]]
    });

    //单击列事件
    $('#sps').datagrid({
        onDblClickRow: function (index, row) {
            var stationId = row.stationId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("spstation.dolly('" + stationId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#sps').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow)) {
                	return;
                }
                
                //构造对象
                var opts = {};
                opts.SysID = curRow["SysID"];
                opts.systemId = curRow["systemId"];
                opts.stationId = curRow["stationId"];
                opts.station = curRow["station"];
                opts.stationName = curRow["stationName"];
                opts.location = curRow["location"];
                opts.staffCount = curRow["staffCount"];
                opts.staff = curRow["staff"];
                opts.alarmFlag = curRow["alarmFlag"];
                opts.value = curRow["value"];
                opts.deviceType = 3;
                
                var strOpts = "";
                try{
                    strOpts = JSON.stringify(opts);
                } catch (e) {
                    return;
                }

                var script = "var pickCmd = new mxLib.PickCmd('', null, '" + strOpts + "'); map.startCommand(pickCmd);"
                //执行拾取命令(命令写法参照说明文档,脚本文件sensorPick.js由view层LoadMxLib加载)
                MetaMapX.CurViewEvaluateJavaScript(script);
            }
        }
    });

    //加载数据
    $('#sps').datagrid('loadData', json);
    $('#sps').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function abstationSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.abstation.savePosition()");
}

function loadAbstation() {
	MetaMapX.CurViewEvaluateJavaScript("window.abstation.getPosition()");
	MetaMapX.CurViewEvaluateJavaScript("window.abstation.autoRefresh()");
	var station = MetaMapX.CurViewEvaluateJavaScript("window.abstation.getStation()");
	
	if (station == "" || station == null){
		return;
	}
    var stationArr = [];
    try {
    	stationArr = $.parseJSON(station);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = stationArr.length;
    json.rows = stationArr;
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "', 4); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);
    
    $('#abs').datagrid({
        remoteSort: false,
        singleSelect: true,
        nowrap: false,
        fitColumns: true,
        loadMsg: '数据正在加载,请耐心的等待...',
        striped: true,
        columns: [[
            { field: 'systemId', title: '系统序号', width: 100, align: 'center', hidden:true},
            { field: 'stationId', title: '分站ID', width: 100, align: 'center', hidden:true},
            { field: 'station', title: '分站地址', width: 40, align: 'center'},
            { field: 'stationName', title: '分站名称', width: 75, align: 'center'},
            { field: 'location', title: '安装地点', width: 120, align: 'center' },
            { field: 'type', title: '状态', width: 120, align: 'center' },
            { field: 'value', title: 'Value', width: 120, align: 'center', hidden: true},
            { field: 'alarmFlag', title: 'AlarmFlag', width: 120, align: 'center', hidden: true},
            { field: 'x', title: 'x坐标', width: 30, align: 'center', hidden: true},
            { field: 'y', title: 'y坐标', width: 30, align: 'center', hidden: true},
            {
                field: 'pick',
                title: '拾取',
                width: 30,
                align: 'center',
                formatter: function (value, row, index) {
                    return '<img src="mx/dataMine/image/pick.png"/>';
                }
            }
        ]]
    });

    //单击列事件
    $('#abs').datagrid({
        onDblClickRow: function (index, row) {
            var stationId = row.stationId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("abstation.dolly('" + stationId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#abs').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow)) {
                	return;
                }
                
                //构造对象
                var opts = {};
                opts.SysID = curRow["SysID"];
                opts.systemId = curRow["systemId"];
                opts.stationId = curRow["stationId"];
                opts.station = curRow["station"];
                opts.stationName = curRow["stationName"];
                opts.location = curRow["location"];
                opts.type = curRow["type"];
                opts.alarmFlag = curRow["alarmFlag"];
                opts.value = curRow["value"];
                opts.deviceType = 4;
                
                var strOpts = "";
                try{
                    strOpts = JSON.stringify(opts);
                } catch (e) {
                    return;
                }

                var script = "var pickCmd = new mxLib.PickCmd('', null, '" + strOpts + "'); map.startCommand(pickCmd);"
                //执行拾取命令(命令写法参照说明文档,脚本文件sensorPick.js由view层LoadMxLib加载)
                MetaMapX.CurViewEvaluateJavaScript(script);
            }
        }
    });

    //加载数据
    $('#abs').datagrid('loadData', json);
    $('#abs').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}