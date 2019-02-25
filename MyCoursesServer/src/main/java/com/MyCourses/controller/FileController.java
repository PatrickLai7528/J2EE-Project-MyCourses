package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName FileUploadController
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.FileEmptyException;
import com.MyCourses.service.IFileService;
import com.MyCourses.service.RenamableResource;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;

@RestController
@RequestMapping("file")
public class FileController {

    private final IFileService fileService;

    @Autowired
    public FileController(IFileService fileUploadService) {
        this.fileService = fileUploadService;
    }


    @PostMapping(value = "attachment/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public APIResponse<String> attachmentUpload(MultipartFile file) {
        try {
            String fileName = fileService.uploadAttachment(file);
            return ResponseUtils.ok("上傳成功", fileName);
        } catch (IOException | FileEmptyException e) {
            e.printStackTrace();
            return ResponseUtils.error("上傳失敗", "");
        }
    }

    @PostMapping(value = "slide/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public APIResponse<String> slideUpload(MultipartFile file) {
        try {
            String fileName = fileService.uploadSlide(file);
            return ResponseUtils.ok("上傳成功", fileName);
        } catch (IOException | FileEmptyException e) {
            e.printStackTrace();
            return ResponseUtils.error("上傳失敗", "");
        }
    }

    private ResponseEntity download(RenamableResource renamableResource) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        String name;
        if (renamableResource.isRenamed()) {
            name = renamableResource.getNewName();
        } else {
            name = renamableResource.getResource().getFilename();
        }

        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"",
                URLEncoder.encode(name)));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        try {
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(renamableResource.getResource().contentLength())
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .body(new InputStreamResource(renamableResource.getResource().getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("slide/download")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public ResponseEntity downloadSlide(@RequestParam(name = "fileName") String fileName,
                                        @RequestParam(name = "rename", required = false) String rename) {
        RenamableResource renamableResource = fileService.downloadSlide(fileName, rename);
        return download(renamableResource);
    }

    @GetMapping("attachment/download")
    @CrossOrigin(origins = "http://localhost:3000")
    @PleaseLog
    public ResponseEntity downloadAttachment(@RequestParam(name = "fileName") String fileName, @RequestParam(name =
            "rename", required = false) String rename) {
        RenamableResource renamableResource = fileService.downloadAttachment(fileName, rename);
        return download(renamableResource);
    }
}
