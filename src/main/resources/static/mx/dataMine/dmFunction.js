/**
* @fileoverview 专业demo功能。
*
* @author Metamap Map Api Group
*/

/**
* 监测监控系统中的传感器位置拾取管理
* 前端采用jquery easyui 框架datagrid
*/
function jcdManage() {
    //展开
    $('#cc').layout('expand', 'west');

    //demo中用easyui库进行前端开发,运用accordion控件添加panel
    addPanel('传感器管理', 'sensorManage');
    addPanel('安全监控分站管理', 'smManage');
    addPanel('人员定位分站管理', 'spManage');
    addPanel('语音广播音响管理', 'abManage');
    $("#westPanelData").accordion("select", "传感器管理");

    //获得各类数据
    MetaMapX.CurViewEvaluateJavaScript("window.sensor.getPosition()");
    MetaMapX.CurViewEvaluateJavaScript("window.sensor.getData()");
    var sensorData = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getSensorInfo()");
    var smStationData = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getSafetyMonitoringStation()");
    var spStationData = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getStaffPositioningStation()");
    var abStationData = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getAudioBroadcastingStation()");
    
    loadSensorPanel(sensorData);
    loadSmStationPanel(smStationData);
    loadSpStationPanel(spStationData);
    loadAbStationPanel(abStationData);
}

/**
 * 在accordion中添加面板
 */
function addPanel(name, div) {
	// 判断是否已经加载
	var obj = $("#westPanelData").accordion("getPanel", name);
	if (!$.isEmptyObject(obj)) {

		// 设置选中的面板
		$("#westPanelData").accordion("select", name);
		return;
	} else {
		var content = '<div id="' + div + '"></div>';

		$('#westPanelData').accordion('add', {
			iconCls : div,
			collapsible : true,
			title : name,
			content : content,
			tools : [ {
				iconCls : 'panel-tool-close',
				handler : function() {
					$('#westPanelData').accordion('remove', name);
				}
			} ]
		});
	}
}

/**
 * 监测点位置保存。
 */
function jcdSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.sensor.savePosition()");
}

/**
 * 监测点位置保存。
 */
function pointDistance() {
	MetaMapX.CurViewEvaluateJavaScript("var distanceCmd = new mxLib.DistanceMeasureCmd('distance', null, '{}'); map.startCommand(distanceCmd);");
}

var layerSwitch = true;
/**
 * 图层
 * @returns
 */
function layerCtrl() {
	if (layerSwitch) {
		MetaMapX.CurViewEvaluateJavaScript("map.addControl(layerCtrl);");
		layerSwitch = false;
	} else {
		MetaMapX.CurViewEvaluateJavaScript("map.removeControl(layerCtrl);");
		layerSwitch = true;
	}
}

function cadVisible() {
	MetaMapX.CurViewEvaluateJavaScript("if (map.getVisble()) {map.setVisible(false);} else {map.setVisible(true);}");
}

/**
 * 设置背景
 */
function setViewBkColor() {
	MetaMapX.SetViewBackColor(0x000000);
}

/**
 * 页面轮播
 */
function rollView(path) {
	// 第二个参数设置成true,表示新增视图
	MetaMapX.OpenDwg(path, true, "");
	// 轮播时间，不设置默认5s
	MetaMapX.SetRollTime(3);
	// 1 网格布局 2轮播
	MetaMapX.SetLayoutType(2);
	// 开始轮播
	MetaMapX.StartRollView();
}

function loadSensorPanel(sensorData) {
	if (sensorData == "" || sensorData == null){
		return;
	}
    var jcArr = [];
    try {
        jcArr = $.parseJSON(sensorData);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = jcArr.length;
    json.rows = jcArr;
    // 在图上加载传感器信息
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "'); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);

    $('#sensorManage').datagrid({
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
    $('#sensorManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorId = row.sensorId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#sensorManage').datagrid('getData').rows[index];
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
    $('#sensorManage').datagrid('loadData', json);
    $('#sensorManage').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function loadSmStationPanel(smStationData) {
	if (smStationData == "" || smStationData == null){
		return;
	}
    var jcArr = [];
    try {
        jcArr = $.parseJSON(smStationData);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = jcArr.length;
    json.rows = jcArr;

    $('#smManage').datagrid({
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
    $('#smManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorId = row.sensorId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#smManage').datagrid('getData').rows[index];
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
    $('#smManage').datagrid('loadData', json);
    $('#smManage').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function loadSpStationPanel(spStationData) {
	if (spStationData == "" || spStationData == null){
		return;
	}
    var jcArr = [];
    try {
        jcArr = $.parseJSON(spStationData);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = jcArr.length;
    json.rows = jcArr;

    $('#spManage').datagrid({
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
    $('#spManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorId = row.sensorId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#spManage').datagrid('getData').rows[index];
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
    $('#spManage').datagrid('loadData', json);
    $('#spManage').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}

function loadAbStationPanel(abStationData) {
	if (abStationData == "" || abStationData == null){
		return;
	}
    var jcArr = [];
    try {
        jcArr = $.parseJSON(abStationData);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = jcArr.length;
    json.rows = jcArr;

    $('#abManage').datagrid({
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
    $('#abManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorId = row.sensorId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#abManage').datagrid('getData').rows[index];
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
    $('#abManage').datagrid('loadData', json);
    $('#abManage').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
}