package com.cuillgln.mx.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.WebRequest;

@Controller
public class WebgisController {

	@RequestMapping("/")
	public String index(WebRequest request, Model model) {

		String agent = request.getHeader("user-agent");
		if (agent.indexOf("MSIE") > 0) {
			model.addAttribute("classid", "clsid:8ACFF379-3E78-4E73-B75E-ECD908072A02");
		} else {
			model.addAttribute("type", "application/metamap2d");
		}
		model.addAttribute("rootpath", request.getContextPath());
		
		return "webgis";
	}
	
	@RequestMapping("/info/{id}")
	public String info(String id) {
		
		return "info";
	}
}
