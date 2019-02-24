package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IFileUploadService
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.FileEmptyException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileUploadService {
    String uploadAttachment(MultipartFile file) throws FileEmptyException, IOException;
}
