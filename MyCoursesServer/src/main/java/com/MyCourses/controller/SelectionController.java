package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName SelectionController
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.enums.SelectionState;
import com.MyCourses.exceptions.MailSendingException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.RepeatSelectCourseException;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.service.ISelectionService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("selection")
public class SelectionController {
    private final ISelectionService selectionService;

    @Autowired
    public SelectionController(ISelectionService selectionService) {
        this.selectionService = selectionService;
    }

    @PleaseLog
    @PostMapping("select")
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<List<SelectionEntity>> select(@RequestParam(name = "rid") String rid,
                                                     @RequestParam(name = "studentEmail") String studentEmail) {
//        String studentEmail = formData.getFirst("studentEmail");
//        Long rid = Long.valueOf(formData.getFirst("rid"));

        try {
            String message;
            SelectionState selectionState = selectionService.select(studentEmail, Long.valueOf(rid));
            switch (selectionState) {
                case ADDED:
                    message = "選課成功";
                    break;
                case OVER:
                    message = "超過選課人數，請等候抽籤";
                    break;
                default:
                    throw new IllegalStateException("should not be here");
            }
            List<SelectionEntity> selectionEntityList = selectionService.getSelectionOf(studentEmail);
            return ResponseUtils.ok(message, selectionEntityList);
        } catch (RepeatSelectCourseException | ReleasementNotExistException | StudentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }


    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("of")
    public APIResponse<List<SelectionEntity>> getSelectionOf(@RequestParam(name = "studentEmail") String studentEmail) {
        List<SelectionEntity> list = selectionService.getSelectionOf(studentEmail);
        return ResponseUtils.ok("操作成功", list);
    }

    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("broadcast/{rid}")
    public APIResponse<Object> broadCastEmailToSelector(@PathVariable(name = "rid") Long rid,
                                                        @RequestBody String content) {
        try {
            selectionService.broadCastEmailToSelector(rid,
                    URLDecoder.decode(content, StandardCharsets.UTF_8).replace("=", ""));
            return ResponseUtils.ok("發送成功");
        } catch (MailSendingException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
