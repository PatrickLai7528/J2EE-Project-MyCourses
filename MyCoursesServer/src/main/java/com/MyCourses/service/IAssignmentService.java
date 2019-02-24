package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IAssignmentService
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.enums.ByteUnit;
import com.MyCourses.exceptions.ReleasementNotExistException;

import java.util.Date;

public interface IAssignmentService {
    void addAssignment(Long rid, String title, String description, Date ddl, int size, ByteUnit byteUnit) throws ReleasementNotExistException;
}
