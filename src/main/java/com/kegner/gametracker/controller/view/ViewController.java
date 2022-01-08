package com.kegner.gametracker.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public interface ViewController {

    @GetMapping({ "/", "/login", "/signup" })
    public String home();

}