var LayerControl = mxLib.LayerControl = function LayerControl() {
	this.defaultAnchor = MX_ANCHOR_TOP_LEFT;
	this.defaultOffset = new mxLib.Size(1, 1);
}

LayerControl.prototype = new mxLib.Control();

LayerControl.prototype.initialize = function(map) {
	var div = document.createElement("div");
	for (var i = 1; i <= 4; i++) {
		// <p id="layerName" ><checkedbox/><span>layerName</span></p>
		var layerDiv = document.createElement("p");
		layerDiv.style.margin = "2px";
		layerDiv.setAttribute("id", "overlay_" + i);
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("checked", "checked");
		layerDiv.appendChild(checkbox);
		var span = document.createElement("span");
		switch (i) {
		case 1:
			span.appendChild(document.createTextNode("传感器层"));
			layerDiv.onclick = function(e) {
				var targetDiv = e.currentTarget;
				var checkbox = targetDiv.getElementsByTagName("input")[0];
				if (checkbox.checked) {
					setOverlayInvisible(1);
					checkbox.checked = false;
				} else {
					setOverlayVisible(1);
					checkbox.checked = true;
				}
			}
			break;
		case 2:
			span.appendChild(document.createTextNode("安全监控分站"));
			layerDiv.onclick = function(e) {
				var targetDiv = e.currentTarget;
				var checkbox = targetDiv.getElementsByTagName("input")[0];
				if (checkbox.checked) {
					setOverlayInvisible(2);
					checkbox.checked = false;
				} else {
					setOverlayVisible(2);
					checkbox.checked = true;
				}
			}
			break;
		case 3:
			span.appendChild(document.createTextNode("人员定位分站"));
			layerDiv.onclick = function(e) {
				var targetDiv = e.currentTarget;
				var checkbox = targetDiv.getElementsByTagName("input")[0];
				if (checkbox.checked) {
					setOverlayInvisible(3);
					checkbox.checked = false;
				} else {
					setOverlayVisible(3);
					checkbox.checked = true;
				}
			}
			break;
		case 4:
			span.appendChild(document.createTextNode("语音广播分站"));
			layerDiv.onclick = function(e) {
				var targetDiv = e.currentTarget;
				var checkbox = targetDiv.getElementsByTagName("input")[0];
				if (checkbox.checked) {
					setOverlayInvisible(4);
					checkbox.checked = false;
				} else {
					setOverlayVisible(4);
					checkbox.checked = true;
				}
			}
			break;
        case 5:
            span.appendChild(document.createTextNode("交换机"));
			layerDiv.onclick = function(e) {
				var targetDiv = e.currentTarget;
				var checkbox = targetDiv.getElementsByTagName("input")[0];
				if (checkbox.checked) {
					setOverlayInvisible(5);
					checkbox.checked = false;
				} else {
					setOverlayVisible(5);
					checkbox.checked = true;
				}
			}
			break;
		}
		layerDiv.appendChild(span);
		div.appendChild(layerDiv);
	}

	var layers = eval(map.getLayer());
	for (var i = 0; i < layers.length; i++) {
		// <p id="layerName" ><checkedbox/><span>layerName</span></p>
		var layerDiv = document.createElement("p");
		layerDiv.style.margin = "2px";
		var layerName = layers[i].layerName;
		layerDiv.setAttribute("id", layerName);
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("checked", "checked");
		layerDiv.appendChild(checkbox);
		var span = document.createElement("span");
		span.appendChild(document.createTextNode(layerName));
		layerDiv.appendChild(span);
		layerDiv.onclick = function(e) {
			var targetDiv = e.currentTarget;
			var checkbox = targetDiv.getElementsByTagName("input")[0];
			if (checkbox.checked) {
				setLayerInvisible(map, targetDiv.id);
				checkbox.checked = false;
			} else {
				setLayerVisible(map, targetDiv.id);
				checkbox.checked = true;
			}
		}
		div.appendChild(layerDiv);
	}
	div.style.cursor = "pointer";
	div.style.border = "1px solid gray";
	div.style.backgroundColor = "white";
	div.onclick = function(e) {
	}
	map.getContainer().appendChild(div);
	return div;
}

function setLayerVisible(map, layerName) {
	map.setLayerAttribute(layerName, 'DWG_LAYER_VISBLE', 'true');
}
function setLayerInvisible(map, layerName) {
	map.setLayerAttribute(layerName, 'DWG_LAYER_VISBLE', 'false');
}

function setOverlayVisible(i) {
	switch (i) {
	case 1:
		for ( var i in window.sensor.markerMap) {
			var marker = window.sensor.markerMap[i];
			marker.show();
		}
		break;
	case 2:
		for ( var i in window.smstation.markerMap) {
			var marker = window.smstation.markerMap[i];
			marker.show();
		}
		break;
	case 3:
		for ( var i in window.spstation.markerMap) {
			var marker = window.spstation.markerMap[i];
			marker.show();
		}
		break;
	case 4:
		for ( var i in window.abstation.markerMap) {
			var marker = window.abstation.markerMap[i];
			marker.show();
		}
		break;
    case 5:
		for ( var i in window.hub.markerMap) {
			var marker = window.hub.markerMap[i];
			marker.show();
		}
		break;
	}
}
function setOverlayInvisible(i) {
	switch (i) {
	case 1:
		for ( var i in window.sensor.markerMap) {
			var marker = window.sensor.markerMap[i];
			marker.hide();
		}
		break;
	case 2:
		for ( var i in window.smstation.markerMap) {
			var marker = window.smstation.markerMap[i];
			marker.hide();
		}
		break;
	case 3:
		for ( var i in window.spstation.markerMap) {
			var marker = window.spstation.markerMap[i];
			marker.hide();
		}
		break;
	case 4:
		for ( var i in window.abstation.markerMap) {
			var marker = window.abstation.markerMap[i];
			marker.hide();
		}
		break;
	case 5:
		for ( var i in window.hub.markerMap) {
			var marker = window.hub.markerMap[i];
			marker.hide();
		}
		break;
	}
}
