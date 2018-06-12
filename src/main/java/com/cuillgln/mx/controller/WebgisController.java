package com.cuillgln.mx.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

@Controller
public class WebgisController {

	@Value("${app.map.main}")
	private String baseMap;

	@Value("${app.map.selfcheck}")
	private String selfCheckMap;

	@Value("${mx.server.classid}")
	private String mxServerClassId;

	@Value("${mx.server.url}")
	private String mxServerUrl;

	@RequestMapping("/")
	public String index(WebRequest request, Model model) {
		initModel(request, model, baseMap);
		return "webgis";
	}

	@RequestMapping("/stationpath")
	public String stationPath(WebRequest request, Model model) {
		initModel(request, model, baseMap);
		return "stationpath";
	}

	@RequestMapping("/history")
	public String history(WebRequest request, Model model) {
		initModel(request, model, baseMap);
		return "history";
	}

	@RequestMapping("/sensorinfo")
	public String info(@RequestParam("sensorId") String sensorId, @RequestParam("deviceType") String deviceType,
			Model model) {
		model.addAttribute("sensorId", sensorId);
		model.addAttribute("deviceType", deviceType);
		return "sensorinfo";
	}

	@RequestMapping("/dwg")
	public String history(Model model) {
		model.addAttribute("baseMap", baseMap);
		return "dwg";
	}

	@RequestMapping("/selfcheck")
	public String selfcheck(WebRequest request, Model model) {
		initModel(request, model, selfCheckMap);
		return "selfcheck";
	}

	private void initModel(WebRequest request, Model model, String map) {
		String agent = request.getHeader("user-agent");
		if (agent.indexOf("MSIE") > 0) {
			model.addAttribute("classid", "clsid:8ACFF379-3E78-4E73-B75E-ECD908072A02");
		} else {
			model.addAttribute("type", "application/metamap2d");
		}
		model.addAttribute("baseMap", map);
		model.addAttribute("mxServerClassId", mxServerClassId);
		model.addAttribute("mxServerUrl", mxServerUrl);
	}
}
