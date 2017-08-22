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
* 扩展数据由WebGIS.aspx页面中MetaMapX.CurViewSetData("mineId", "1")中传入
*/
var mine_Id = MvHost.GetData("mineId");
/**
* @数据对象,负责数据相关操作
*/
var sensor = new mxLib.Sensor();

//加入导航条
var naviCtrl = new mxLib.NavigationControl();
naviCtrl.setOffset(new mxLib.Size(3, 32));
naviCtrl.setAnchor(MX_ANCHOR_BOTTOM_RIGHT);
map.addControl(naviCtrl);

//加入标识条
//var logCtrl = new LogControl();
//map.addControl(logCtrl);

/**
 * @设置定时间隔,每隔每隔5s更新数据
 */
window.setInterval(function () {
    sensor.getData();
}, 2000);