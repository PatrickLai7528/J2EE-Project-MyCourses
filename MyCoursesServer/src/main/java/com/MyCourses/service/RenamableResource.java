package com.MyCourses.service;
/*
 * @PackageName com.MyCourses.service
 * @ClassName RenamableResource
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import lombok.Data;
import org.springframework.core.io.Resource;

@Data
public class RenamableResource {

    private boolean isRenamed;

    private Resource resource;

    private String newName;
}
