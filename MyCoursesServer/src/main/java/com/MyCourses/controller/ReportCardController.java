package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName ReportCardController
 * @Author Lai Kin Meng
 * @Date  2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.exceptions.SelectionNotExistException;
import com.MyCourses.service.IReportCardService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reportcard")
public class ReportCardController {

    public static class ScoreItem {
        public Long slid;
        public double score;
    }

    private final IReportCardService reportCardService;

    @Autowired
    public ReportCardController(IReportCardService reportCardService) {
        this.reportCardService = reportCardService;
    }

    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("add")
    @VerifyToken
    public APIResponse<Object> addScore(@RequestBody List<ScoreItem> scoreItemList) {
        try {
            for (ScoreItem scoreItem : scoreItemList) {
                reportCardService.addScore(scoreItem.slid, scoreItem.score);
            }
            return ResponseUtils.ok("操作成功");
        } catch (SelectionNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
