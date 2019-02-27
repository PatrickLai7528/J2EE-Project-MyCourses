package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IFileService
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.FileEmptyException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileService {
    String uploadAttachment(MultipartFile file) throws FileEmptyException, IOException;

    String uploadSlide(MultipartFile file) throws FileEmptyException, IOException;

    String uploadSubmission(MultipartFile file) throws FileEmptyException, IOException;

    RenamableResource downloadAttachment(String fileName, String rename);

    RenamableResource downloadSlide(String fileName, String rename);

    RenamableResource downloadSubmission(String fileName, String rename);

}        
