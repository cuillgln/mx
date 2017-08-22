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
//    if ($.isEmptyObject("MetaMapX"))
//        return;

    //展开
    $('#cc').layout('expand', 'west');

    //demo中用easyui库进行前端开发,运用accordion控件添加panel
    addPanel('监测点管理', 'jcManage');

    //获得监控基本信息(通过执行脚本和view层交互,getJKInfo()函数在view页面中data.js中定义,由view页面加载,具体在mxLib/LoadMxLib.js中定义)
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
            { field: 'SensorID', title: '测点编号', width: 100, align: 'center', hidden:true},
            { field: 'Location', title: '安装位置', width: 120, align: 'center' },
            { field: 'SensorType', title: '类型', width: 75, align: 'center' },
            { field: 'Unit', title: '单位', width: 75, align: 'center', hidden: true },
            { field: 'SensorDataID', title: '数据类型', width: 75, align: 'center', hidden: true },
            { field: 'MinMete', title: '量程下限', width: 90, align: 'center', hidden: true },
            { field: 'MaxMete', title: '量程上限', width: 90, align: 'center', hidden: true },
            { field: 'MinAlarm', title: '报警下限', width: 90, align: 'center', hidden: true },
            { field: 'MaxAlarm', title: '报警上限', width: 90, align: 'center', hidden: true },
            { field: 'HCutValue', title: '断电上限', width: 90, align: 'center', hidden: true },
            { field: 'HResetValue', title: '复电上限', width: 90, align: 'center', hidden: true },
            { field: 'LCutValue', title: '断电下限', width: 90, align: 'center', hidden: true },
            { field: 'LResetValue', title: '复电下限', width: 30, align: 'center', hidden: true },
            { field: 'x', title: 'x坐标', width: 30, align: 'center', hidden: true },
            { field: 'y', title: 'y坐标', width: 30, align: 'center', hidden: true },
            {
                field: 'pick',
                title: '拾取',
                width: 30,
                align: 'center',
                formatter: function (value, row, index) {
                    return '<img src="mx/dataMine/image/坐标拾取.png"/>';
                }
            }
        ]]
    });

    //单击列事件
    $('#jcManage').datagrid({
        onDblClickRow: function (index, row) {
            var sensorID = row.SensorID;
            //执行定位脚本
            MetaMapX.CurViewEvaluateJavaScript("sensor.dolly('" + sensorID + "')");
        },
        onClickCell: function (index, field, value) {
            if (field == "pick") {
                var curRow = $('#jcManage').datagrid('getData').rows[index];
                if ($.isEmptyObject(curRow))
                    return;

                //构造对象
                var opts = {};
                opts.SensorID = curRow["SensorID"];
                opts.SysID = curRow["SysID"];
                opts.Location = curRow["Location"];
                opts.SensorTypeID = curRow["SensorTypeID"];
                opts.SensorType = curRow["SensorType"];
                opts.SensorDataID = curRow["SensorDataID"];
                opts.Unit = curRow["Unit"];
                opts.MinMete = curRow["MinMete"];
                opts.MaxMete = curRow["MaxMete"];
                opts.MinAlarm = curRow["MinAlarm"];
                opts.MaxAlarm = curRow["MaxAlarm"];
                opts.HCutValue = curRow["HCutValue"];
                opts.HResetValue = curRow["HResetValue"];
                opts.LCutValue = curRow["LCutValue"];
                opts.LResetValue = curRow["LResetValue"];
                
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
    //判断是否已经加载
    var obj = $("#westPanelData").accordion("getPanel", name);
    if (!$.isEmptyObject(obj)) {

        //设置选中的面板
        $("#westPanelData").accordion("select", name);
        return;
    }
    else {
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
            iconCls: div,
            collapsible: true,
            title: name,
            content: content,
            tools: [{
                iconCls: 'panel-tool-close',
                handler: function () {
                    $('#westPanelData').accordion('remove', name);
                }
            }]
        });
    }
}

/**
 * 监测点位置保存。
 * @returns
 */
function jcdSave() {
	MetaMapX.CurViewEvaluateJavaScript("window.sensor.savePosition()");
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
    //第二个参数设置成true,表示新增视图
    MetaMapX.OpenDwg(path, true, "");
    //轮播时间，不设置默认5s
    MetaMapX.SetRollTime(3);
    //1 网格布局 2轮播
    MetaMapX.SetLayoutType(2);
    //开始轮播
    MetaMapX.StartRollView();
}

