package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName FileUploadController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.FileEmptyException;
import com.MyCourses.service.IFileUploadService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("file")
public class FileUploadController {

    private final IFileUploadService fileUploadService;

    @Autowired
    public FileUploadController(IFileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }


    @RequestMapping(value = "attachment/upload", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public APIResponse<String> fileUpload(MultipartFile file) {
        try {
            String fileName = fileUploadService.uploadAttachment(file);
            return ResponseUtils.ok("上傳成功", fileName);
        } catch (IOException | FileEmptyException e) {
            e.printStackTrace();
            return ResponseUtils.error("上傳失敗", "");
        }
    }
}
