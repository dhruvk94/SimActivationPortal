package com.simactivation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class SimActivationController {

	@RequestMapping(value="/",method=RequestMethod.GET)
	public ModelAndView getHomePage(){
		return new ModelAndView("simhome","","");
	}
}
