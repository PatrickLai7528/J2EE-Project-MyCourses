package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName SlideController
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.ISlideService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("slide")
@RestController
public class SlideController {

    private final ISlideService slideService;
    private final IReleasementService releasementService;

    @Autowired
    public SlideController(ISlideService slideService, IReleasementService releasementService) {
        this.slideService = slideService;
        this.releasementService = releasementService;
    }

    @PostMapping("add")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    @VerifyToken
    public APIResponse<ReleasementEntity> addSlideOf(
            @RequestParam(name = "rid") Long rid,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "fileName") String fileName
    ) {
        try {
            slideService.addSlide(title, fileName, rid);
            ReleasementEntity releasementEntity = releasementService.getReleasementByRid(rid);
            return ResponseUtils.ok("操作成功", releasementEntity);
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }
}
