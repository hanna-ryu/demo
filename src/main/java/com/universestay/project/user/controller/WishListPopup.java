package com.universestay.project.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user/wishList")
public class WishListPopup {

    @GetMapping("/popup")
    public String popup() {
        System.out.println("/wishListPopup.jsp");
        return "/user/myPage/wishListPopup";
    }

}
