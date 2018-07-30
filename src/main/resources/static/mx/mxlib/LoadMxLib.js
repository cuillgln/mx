
//样式
linkcss(scriptBaseDir + "css/map.css");
linkcss(scriptBaseDir + "dataMine/css/dmExplit.css");
linkcss(scriptBaseDir + "dataMine/easyui/themes/metro-blue/easyui.css")

//脚本
include(scriptBaseDir + "mxlib/jquery-1.11.2.min.js");
include(scriptBaseDir + "mxlib/snap.svg-min.js");
include(scriptBaseDir + "mxlib/paper-full.min.js");
include(scriptBaseDir + "dataMine/json3.min.js");
include(scriptBaseDir + "dataMine/easyui/jquery.easyui.min.js");

//元图地图库
include(scriptBaseDir + "mxlib/api.min.js");
include(scriptBaseDir + "mxlib/Mapv.min.js");
include(scriptBaseDir + "mxlib/measure.js");
include(scriptBaseDir + "dataMine/sensor.js");
include(scriptBaseDir + "dataMine/safetymonitoringstation.js");
include(scriptBaseDir + "dataMine/staffpositioningstation.js");
include(scriptBaseDir + "dataMine/audiobroadcastingstation.js");
include(scriptBaseDir + "dataMine/hub.js");
include(scriptBaseDir + "dataMine/logicalarm.js");
include(scriptBaseDir + "dataMine/pickcmd.js");
include(scriptBaseDir + "dataMine/locatecmd.js");
include(scriptBaseDir + "dataMine/layercontrol.js");
include(scriptBaseDir + "dataMine/staffpositionhistory.js");
include(scriptBaseDir + "dataMine/stationpath.js");
include(scriptBaseDir + "dataMine/vehicle.js");

//二次开发入口文件 加载完成了dom后
domLoadedInclude(scriptBaseDir + "Main.js");