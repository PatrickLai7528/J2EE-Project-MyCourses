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
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.RepeatSelectCourseException;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.service.ISelectionService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

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
    public APIResponse<Object> select(@RequestParam(name = "rid") String rid,
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
            return ResponseUtils.ok(message);
        } catch (RepeatSelectCourseException | ReleasementNotExistException | StudentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }


    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("of")
    public APIResponse<List<SelectionEntity>> getSelectionOf(@RequestParam(name = "studentEmail") String studentEmail) {
        List<SelectionEntity> list = selectionService.getSelectionOf(studentEmail);
        return ResponseUtils.ok("操作成功", list);
    }
}
