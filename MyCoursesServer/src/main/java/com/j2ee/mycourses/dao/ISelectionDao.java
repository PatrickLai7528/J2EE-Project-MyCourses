package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName ISelectionDao
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.ReleasementEntity;
import com.j2ee.mycourses.entity.SelectionEntity;
import com.j2ee.mycourses.entity.StudentEntity;
import org.hibernate.sql.SelectExpression;

import java.util.List;

public interface ISelectionDao extends IGeneralDao<SelectionEntity> {
    SelectionEntity retrieveBySlid(long slid);

    List<SelectionEntity> retrieveByStudent(StudentEntity studentEntity);

    List<SelectionEntity> retrieveByReleasement(ReleasementEntity releasementEntity);

}
