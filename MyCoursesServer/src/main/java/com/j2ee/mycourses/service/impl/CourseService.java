package com.j2ee.mycourses.service.impl;

/*
 * @PackageName com.j2ee.mycourses.service.impl
 * @ClassName CourseService
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.ICourseDao;
import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.entity.CourseEntity;
import com.j2ee.mycourses.entity.ReleasementEntity;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.error.CourseHasNoTeacherException;
import com.j2ee.mycourses.error.TeacherNotExistException;
import com.j2ee.mycourses.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService implements ICourseService {

    private final ITeacherDao teacherDao;
    private final ICourseDao courseDao;

    @Autowired
    public CourseService(ITeacherDao teacherDao, ICourseDao courseDao) {
        this.teacherDao = teacherDao;
        this.courseDao = courseDao;
    }

    @Override
    public void newCourse(CourseEntity courseEntity) throws CourseHasNoTeacherException, TeacherNotExistException {
//        if(courseEntity.getTeacherEntity() == null)
//            throw new CourseHasNoTeacherException();
//
//        if(teacherDao.retrieveByEmail(courseEntity.getTeacherEntity().getEmail()) == null)
//            throw new TeacherNotExistException();

        courseDao.create(courseEntity);
    }

    @Override
    public void releaseCourse(ReleasementEntity releasementEntity) {

    }

    @Override
    public boolean selectCourse(ReleasementEntity releasementEntity, StudentEntity studentEntity) {
        return false;
    }

    @Override
    public void dropCourse(ReleasementEntity releasementEntity, StudentEntity studentEntity) {

    }
}
