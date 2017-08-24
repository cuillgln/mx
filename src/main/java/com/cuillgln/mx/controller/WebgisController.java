package com.cuillgln.mx.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

@Controller
public class WebgisController {

	@Value("${app.map.name}")
	private String baseMap;

	@RequestMapping("/")
	public String index(WebRequest request, Model model) {

		String agent = request.getHeader("user-agent");
		if (agent.indexOf("MSIE") > 0) {
			model.addAttribute("classid", "clsid:8ACFF379-3E78-4E73-B75E-ECD908072A02");
		} else {
			model.addAttribute("type", "application/metamap2d");
		}
		model.addAttribute("baseMap", baseMap);
		return "webgis";
	}

	@RequestMapping("/sensorinfo")
	public String info(@RequestParam("sensorId") String sensorId, Model model) {
		model.addAttribute("sensorId", sensorId);
		return "sensorinfo";
	}
}
