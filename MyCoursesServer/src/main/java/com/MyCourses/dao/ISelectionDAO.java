package com.MyCourses.dao;
/*
 * @PackageName com.MyCourses.dao
 * @ClassName ISelectionDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.StudentEntity;

import java.util.List;

public interface ISelectionDAO extends IGeneralDAO<SelectionEntity> {
    SelectionEntity retrieveBySlid(Long slid);

    List<SelectionEntity> retrieveByStudent(StudentEntity studentEntity);

    List<SelectionEntity> retrieveByReleasement(ReleasementEntity releasementEntity);
}
