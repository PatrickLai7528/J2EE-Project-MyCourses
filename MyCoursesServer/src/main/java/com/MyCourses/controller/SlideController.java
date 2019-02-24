package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName SlideController
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.ISlideService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("slide")
@RestController
public class SlideController {

    private final ISlideService slideService;

    @Autowired
    public SlideController(ISlideService slideService) {
        this.slideService = slideService;
    }

    @PostMapping("add")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public APIResponse<Object> addSlideOf(
            @RequestParam(name = "rid") Long rid,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "filePath") String filePath
    ) {
        try {
            slideService.addSlide(title, filePath, rid);
            return ResponseUtils.ok("操作成功");
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
