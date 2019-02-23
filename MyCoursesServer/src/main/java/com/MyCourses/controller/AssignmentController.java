package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName AssignmentController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IAssignmentService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Controller
@RequestMapping("assignment")
public class AssignmentController {
    private final IAssignmentService assignmentService;

    @Autowired
    public AssignmentController(IAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<APIResponse> addAssignment(
            @RequestParam(name = "rid") Long rid,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "desc") String desc
    ) {
        try {
            assignmentService.addAssignment(rid, title, desc);
            return new ResponseEntity<>(
                    ResponseUtils.ok("操作成功"),
                    HttpStatus.OK
            );
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
