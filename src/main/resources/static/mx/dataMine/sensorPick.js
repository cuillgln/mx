/**
* @fileoverview 拾取命令
*
* @author Metamap Map Api Group
*/

/*
* PickPoint类的构造函数
* @class  拾取点坐标
* @param  {String} name 命令名称 
* @param  {Command} parentCmd 调用命令对象 
* @param  {Json Object} opts 命令选项
* @constructor
*/
var PickCmd =
mxLib.PickCmd = function PickCmd(name, parentCmd, opts) {
    mxLib.Command.prototype.constructor.call(this, name, parentCmd, opts);

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
mxLib.Lang.inherits(PickCmd, mxLib.Command);
/*
* 抽象方法，开始命令
* @param {Map} map 地图对象
* @returns {None} 
*/
PickCmd.prototype.start = function (map) {
    mxLib.Command.prototype.start.call(this, map);
    //根据类型判断图片基本路径
    var strBasePath = scriptBaseDir + "dataMine/image/";

    //根据类型判断需要哪一张图片
    var strTotalPath = strBasePath + "default-normal.png";

    //构造html
    var html = '<div style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 36px; left: 0px; top: 0px; overflow: hidden;">'
                 + '<img id="rm3_image" style="border:none;left:0px; top:0px; position:absolute;" src="' + strTotalPath + '">'
                 + '</div>'
                 + '<label class=" BMapLabel" unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun; z-index: 80; color: rgb(255, 102, 0); left: 25px; top: 3px;"></label>';

    //默认坐标
    var point = map.getCenter();
    var myRichMarker = new mxLib.RichMarker(html, point, {
        "anchor": new mxLib.Size(-18, -27),
        "enableDragging": false
    });

    this.marker = myRichMarker;
    map.addOverlay(this.marker);
}
/**
* 抽象方法，左键按下事件
* @param {Object} e 事件
* @param {Object} data 事件参数
* @returns {None} 
*/
PickCmd.prototype.leftMousedown = function (e, data) {
    var point = mxLib.Util.getEventPoint(this.map, e);
    this.point = point;
}
/**
* 抽象方法，鼠标移动事件
* @param {Object} e 事件
* @param {Object} data 事件参数
* @returns {None} 
*/
PickCmd.prototype.mousemove = function (e, data) {
    var point = mxLib.Util.getEventPoint(this.map, e);
    if (this.marker instanceof mxLib.RichMarker) {
        this.marker.setPosition(point);
    }
}
/**
* 抽象方法，左键抬起事件
* @param {Object} e 事件
* @param {Object} data 事件参数
* @returns {None} 
*/
PickCmd.prototype.leftMouseup = function (e, data) {
    var point = mxLib.Util.getEventPoint(this.map, e);
    this.point = point;
    //手动结束命令
    this.end(false);

    //移除当前覆盖物
    if (!$.isEmptyObject(this.marker) && this.marker instanceof mxLib.RichMarker) {
        map.removeOverlay(this.marker);
    }

    //添加到sensor中
    if ($.isEmptyObject(window.sensor))
        return;

    //坐标
    this.opts.x = this.point.x;
    this.opts.y = this.point.y;

    //添加到测点
    window.sensor.addSensor(this.opts);
}
/**
* 抽象方法，结束命令
* @param {Boolean} bCancel 是否取消
* @returns {None} 
*/
PickCmd.prototype.end = function (bCancel) {
    if (this.marker instanceof mxLib.RichMarker)
        this.map.removeOverlay(this.marker);

    mxLib.Command.prototype.end.call(this, bCancel);
}