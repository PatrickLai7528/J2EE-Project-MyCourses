package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName AssignmentController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.enums.ByteUnit;
import com.MyCourses.exceptions.*;
import com.MyCourses.service.IAssignmentService;
import com.MyCourses.service.ISubmissionService;
import com.MyCourses.utils.DateUtils;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("assignment")
public class AssignmentController {
    private final IAssignmentService assignmentService;
    private final ISubmissionService submissionService;

    @Autowired
    public AssignmentController(IAssignmentService assignmentService, ISubmissionService submissionService) {
        this.assignmentService = assignmentService;
        this.submissionService = submissionService;
    }


    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse addAssignmentOf(
            @RequestParam(name = "rid") Long rid,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "desc") String desc,
            @RequestParam(name = "ddl") String ddl,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "unit") String unit,
            @RequestParam(name = "fileName") String fileName
    ) {
        try {
            Date ddlDate = DateUtils.generateFrom(ddl);
            assignmentService.addAssignment(rid, title, desc, ddlDate, size, ByteUnit.fromString(unit), fileName);
            return ResponseUtils.ok("操作成功");
        } catch (ReleasementNotExistException | DateStringFormatException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }

    @PostMapping("submit")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse submitAssignment(
            @RequestParam(name = "slid") Long selectionId,
            @RequestParam(name = "assid") Long assignmentId,
            @RequestParam(name = "email") String studentEmail,
            @RequestParam(name = "file") String filePath
    ) {
        try {
            submissionService.submitAssignment(studentEmail, selectionId, assignmentId, filePath);
            return ResponseUtils.ok("操作成功");
        } catch (StudentNotExistException | SelectionNotExistException | AssignmentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
