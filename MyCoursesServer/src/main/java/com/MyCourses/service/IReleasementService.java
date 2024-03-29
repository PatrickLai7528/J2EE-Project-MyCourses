package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IReleasementService
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;

import java.util.List;

public interface IReleasementService {
    List<ReleasementEntity> getAll();

    List<ReleasementEntity> getApproved();

    List<ReleasementEntity> getReleasementOf(String teacherEmail) throws TeacherNotExistException;

    ReleasementEntity getReleasementByRid(Long rid) throws ReleasementNotExistException;

}
