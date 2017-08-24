
//样式
linkcss(scriptBaseDir + "css/map.css");
linkcss(scriptBaseDir + "dataMine/css/dmExplit.css");
linkcss(scriptBaseDir + "dataMine/easyui/themes/metro-blue/easyui.css")

//脚本
include(scriptBaseDir + "mxlib/jquery-1.11.2.min.js");
include(scriptBaseDir + "mxlib/snap.svg-min.js");
include(scriptBaseDir + "dataMine/easyui/jquery.easyui.min.js");

//元图地图库
include(scriptBaseDir + "mxlib/api.min.js");
include(scriptBaseDir + "dataMine/sensor.js");
include(scriptBaseDir + "dataMine/sensorPick.js");
include(scriptBaseDir + "dataMine/sensorLocate.js");
include(scriptBaseDir + "dataMine/copyright.js");

//二次开发入口文件 加载完成了dom后
domLoadedInclude(scriptBaseDir + "Main.js");