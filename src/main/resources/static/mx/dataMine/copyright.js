function LogControl() {
    // 默认停靠位置和偏移量
    this.defaultAnchor = MX_ANCHOR_BOTTOM_LEFT;
    this.defaultOffset = new mxLib.Size(1, 1);
}

// 通过JavaScript的prototype属性继承于BMap.Control
LogControl.prototype = new mxLib.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
LogControl.prototype.initialize = function (map) {
    // 创建一个DOM元素
    var div = document.createElement("div");
    // 设置样式
    div.style.position = 'absolute',
    div.style.cursor = "hand";
    div.style.border = "0px solid gray";
    div.style.width = "350px";
    div.style.height = "32px";
    div.style.backgroundColor = "transparent";

    var imgLog = document.createElement("img");
    //设置样式
    imgLog.style.position = 'absolute';
    imgLog.style.cursor = 'pointer';
    imgLog.style.border = "0px solid gray";
    imgLog.style.left = '6px',
    imgLog.style.top = '6px',
    imgLog.style.width = '70px';
    imgLog.style.height = '16px';
    imgLog.src = scriptBaseDir + 'dataMine/image/metamap.png';
    div.appendChild(imgLog);

    //标识
    var span = document.createElement("span");
    //设置样式
    span.style.position = 'absolute';
    span.style.left = "76px";
    span.style.top = "6px";
    span.style.fontFamily = 'Arial';
    span.style.color = '#565656';
    span.style.fontSize = '12px';
    span.innerText = "©2015 元图软件 京ICP备 10045346号-1";
    div.appendChild(span);

    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);

    // 将DOM元素返回
    return div;
}