package dao.factory;/*
 * @PackageName dao.factory
 * @ClassName DaoFactory
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import dao.IStudentDao;
import dao.ITeacherDao;
import dao.impl.StudentDao;
import dao.impl.TeacherDao;

public class DaoFactory {

    public static IStudentDao getStudentDao() {
        return new StudentDao();
    }

    public static ITeacherDao getTeacherDao() {
        return new TeacherDao();
    }
}
