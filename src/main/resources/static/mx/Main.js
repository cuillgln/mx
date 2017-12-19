/**
 * @fileoverview 元图地图二次开发入口文件。
 *
 * @author Metamap Map Api Group
 */

/**
 * @map对象,负责图形相关操作
 */
var map = new mxLib.Map();

/**
 * 禁用双击放大
 */
mxLib.View.setExtData(MV_ATTR_DBCLICKNOPANMAP, true);

/**
 * 扩展数据由webgis.html页面中MetaMapX.CurViewSetData("contextPath", "contextPath")中传入
 */
var contextPath = MvHost.GetData("contextPath");

var canvasLayer = new mxLib.CanvasLayer();
map.addOverlay(canvasLayer);

/**
 * @数据对象,负责数据相关操作
 */
var sensor = new mxLib.Sensor();
var smstation = new mxLib.SafetyMonitoringStation();
var spstation = new mxLib.StaffPositioningStation();
var abstation = new mxLib.AudioBroadcastingStation();

// 历史轨迹
var history = new mxLib.History();

// 分站
var stationpath = new mxLib.StationPath();

// 加入导航条
var naviCtrl = new mxLib.NavigationControl();
naviCtrl.setOffset(new mxLib.Size(3, 32));
naviCtrl.setAnchor(MX_ANCHOR_TOP_RIGHT);
map.addControl(naviCtrl);

// 加入缩略图
var ovctrl = new mxLib.OverviewMapControl();
map.addControl(ovctrl);

// 图层
var layerCtrl = new mxLib.LayerControl();

map.addEventListener("mousemove", function() {
	var point = mxLib.Util.getEventPoint(map, event);
	mxLib.Util.toastInfo("X: " + point.x + ", Y: " + point.y);
});
/**
 * @设置定时间隔,每隔每隔5s更新数据
 */
/*window.setInterval(function() {
	sensor.getData();
}, 5000);*/
