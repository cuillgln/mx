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
    addPanel('监测点管理', 'jcManage');

    //获得各类数据
    MetaMapX.CurViewEvaluateJavaScript("window.sensor.getPosition()");
    MetaMapX.CurViewEvaluateJavaScript("window.sensor.getData()");
    var jcData = MetaMapX.CurViewEvaluateJavaScript("window.sensor.getSensorInfo()");
    
    if (jcData == "" || jcData == null)
        return;

    var jcArr = [];
    try {
        jcArr = $.parseJSON(jcData);
    } catch (e) {
        return;
    }

    var json = {};
    json.total = jcArr.length;
    json.rows = jcArr;

    $('#jcManage').datagrid({
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
    $('#jcManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorId = row.sensorId;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorId + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#jcManage').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow))
                    return;

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
    $('#jcManage').datagrid('loadData', json);

    //移除
    $('#jcManage').datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass('lines-no');
    
    // 在图上加载传感器信息
    var script = "var locateCmd = new mxLib.LocateCmd('', null, '" + JSON.stringify(json) + "'); map.startCommand(locateCmd);"
    MetaMapX.CurViewEvaluateJavaScript(script);
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
		var content = "";
		switch (name) {
		case "监测点管理":
			content = '<div id="' + div + '"></div>';
			break;
		case "识别卡管理":
			content = '<div id="' + div + '"></div>';
			break;
		default:
			break;
		}

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
	MetaMapX.CurViewEvaluateJavaScript("var distanceCmd = new mxLib.DistanceMeasureCmd('distance', null, '{\"bac\": \"bac\"}'); map.startCommand(distanceCmd);");
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

