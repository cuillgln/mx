/**
* @fileoverview 专业demo功能。
*
* @author Metamap Map Api Group
*/


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
			tools : []
		});
	}
}

/**
 * 测量距离
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
