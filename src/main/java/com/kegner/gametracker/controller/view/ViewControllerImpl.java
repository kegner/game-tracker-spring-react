package com.kegner.gametracker.controller.view;

import org.springframework.stereotype.Controller;

@Controller
public class ViewControllerImpl implements ViewController {

    @Override
	public String home() {
		return "index.html";
	}
    
}
