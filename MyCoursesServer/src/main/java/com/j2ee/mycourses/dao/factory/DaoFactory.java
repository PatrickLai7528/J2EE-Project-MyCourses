package com.j2ee.mycourses.dao.factory;/*
 * @PackageName dao.factory
 * @ClassName DaoFactory
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.j2ee.mycourses.dao.IStudentDao;
import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.dao.impl.StudentDao;
import com.j2ee.mycourses.dao.impl.TeacherDao;

public class DaoFactory {

    public static IStudentDao getStudentDao() {
        return new StudentDao();
    }

    public static ITeacherDao getTeacherDao() {
        return new TeacherDao();
    }
}
