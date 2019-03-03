package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName AssignmentController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.enums.ByteUnit;
import com.MyCourses.exceptions.*;
import com.MyCourses.service.IAssignmentService;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.ISelectionService;
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
    private final IReleasementService releasementService;
    private final ISelectionService selectionService;

    @Autowired
    public AssignmentController(IAssignmentService assignmentService, ISubmissionService submissionService, IReleasementService releasementService, ISelectionService selectionService) {
        this.assignmentService = assignmentService;
        this.submissionService = submissionService;
        this.releasementService = releasementService;
        this.selectionService = selectionService;
    }


    @PostMapping("add")
    @PleaseLog
    @VerifyToken
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<ReleasementEntity> addAssignmentOf(
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
            ReleasementEntity releasementEntity = releasementService.getReleasementByRid(rid) ;
            return ResponseUtils.ok("操作成功", releasementEntity);
        } catch (ReleasementNotExistException | DateStringFormatException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PostMapping("submit")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    public APIResponse<SelectionEntity> submitAssignment(
            @RequestParam(name = "slid") Long selectionId,
            @RequestParam(name = "assid") Long assignmentId,
            @RequestParam(name = "email") String studentEmail,
            @RequestParam(name = "file") String filePath
    ) {
        try {
            submissionService.submitAssignment(studentEmail, selectionId, assignmentId, filePath);
            SelectionEntity selectionEntity = selectionService.getSelectionBySlid(selectionId);
            return ResponseUtils.ok("操作成功", selectionEntity);
        } catch (StudentNotExistException | SelectionNotExistException | AssignmentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }
}
