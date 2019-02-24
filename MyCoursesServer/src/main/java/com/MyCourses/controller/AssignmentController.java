package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName AssignmentController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.enums.ByteUnit;
import com.MyCourses.exceptions.DateStringFormatException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IAssignmentService;
import com.MyCourses.utils.DateUtils;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
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
    public APIResponse addAssignment(
            @RequestParam(name = "rid") Long rid,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "desc") String desc,
            @RequestParam(name = "ddl") String ddl,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "unit") String unit
    ) {
        try {
            Date ddlDate = DateUtils.generateFrom(ddl);
            assignmentService.addAssignment(rid, title, desc, ddlDate, size , ByteUnit.fromString(unit));
            return ResponseUtils.ok("操作成功");
        } catch (ReleasementNotExistException | DateStringFormatException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
