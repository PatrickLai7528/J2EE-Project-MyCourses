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
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

@RestController
@RequestMapping("file")
public class FileController {

    private final IFileUploadService fileUploadService;

    @Autowired
    public FileController(IFileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }


    @PostMapping(value = "attachment/upload")
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

    @GetMapping("attachment/download")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog

    public ResponseEntity downloadAttachment(@RequestParam(name = "fileName") String fileName, @RequestParam(name =
            "rename", required = false) String rename) {

        // fileName without path or folder
        fileName = "upload/attachment/" + fileName;
        ClassPathResource resource = new ClassPathResource(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");

        // here can rename file
        // only the name, without the file suffix
        String onlyName = resource.getFilename().split("\\.")[0];  // be careful, use \\. instead of .
        String fileSuffix = "." + resource.getFilename().split("\\.")[1];
        if (rename != null)
            onlyName = rename;
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"",
                URLEncoder.encode(onlyName + fileSuffix)));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        try {
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .body(new InputStreamResource(resource.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
