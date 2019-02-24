package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName FileUploadService
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.FileEmptyException;
import com.MyCourses.service.IEncryptService;
import com.MyCourses.service.IFileService;
import com.MyCourses.service.RenamableResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public class FileService implements IFileService {
    private final static Logger logger = LoggerFactory.getLogger(VerifyService.class);
    private final static String filePath = "/Users/laikinmeng/Documents/GitHub/J2EE-Project-MyCourses/MyCoursesServer/src/main" +
            "/resources/";
    private final static String folderOfAttachment = "upload/attachment/";

    private final IEncryptService encryptService;

    @Autowired
    public FileService(IEncryptService encryptService) {
        this.encryptService = encryptService;
    }

    @Override
    public String uploadAttachment(MultipartFile file) throws FileEmptyException, IOException {
        if (file.getSize() == 0) {
            throw new FileEmptyException();
        }

        logger.info("文件是否為空={}", file.isEmpty());
        logger.info("文件的大小為={}", file.getSize());
        logger.info("文件的媒體類型為={}", file.getContentType());
        logger.info("文件的名字={}", file.getName());
        logger.info("文件的originName為={}", file.getOriginalFilename());
        logger.info("保存位置={}", filePath + folderOfAttachment + file.getOriginalFilename());

        String randomSuffix = encryptService.encrypt(new Date().toString()).substring(0, 10);
        String fileName = "s" + randomSuffix + "-" + file.getOriginalFilename();

        File newFile = new File(filePath + folderOfAttachment + fileName);
        file.transferTo(newFile);
        return fileName;
    }

    @Override
    public RenamableResource downloadAttachment(String fileName, String rename) {
        String fileNameWithFolder = folderOfAttachment + fileName;

        logger.info("download file = {}", fileNameWithFolder);

        ClassPathResource resource = new ClassPathResource(fileNameWithFolder);
        RenamableResource renamableResource = new RenamableResource();
        renamableResource.setResource(resource);
        // here can rename file
        // only the name, without the file suffix
        String onlyName;
        String fileSuffix = "." + resource.getFilename().split("\\.")[1];
        if (rename != null) {
            onlyName = rename;
            renamableResource.setRenamed(true);
            renamableResource.setNewName(onlyName + fileSuffix);
            logger.info("download file renamed as = {}", renamableResource.getNewName());
        }
        return renamableResource;
    }
}