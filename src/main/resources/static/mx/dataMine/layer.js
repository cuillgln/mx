function LayerControl() {
	this.defaultAnchor = MX_ANCHOR_TOP_LEFT;
	this.defaultOffset = new mxLib.Size(1, 1);
}

LayerControl.prototype = new mxLib.Control();

LayerControl.prototype.initialize = function(map) {
	var div = document.createElement("div");

	var layers = eval(map.getLayer());
	for (var i = 0; i < layers.length; i++) {
		// <p id="layerName" ><checkedbox/><span>layerName</span></p>
		var layerDiv = document.createElement("p");
		layerDiv.style.margin="2px";
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