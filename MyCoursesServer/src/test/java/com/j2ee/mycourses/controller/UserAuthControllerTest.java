package com.j2ee.mycourses.controller;/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName UserAuthControllerTest
 * @Author Lai Kin Meng
 * @Date 2019-02-15
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.impl.StudentDao;
import com.j2ee.mycourses.dao.impl.TeacherDao;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.service.impl.EncryptService;
import com.j2ee.mycourses.service.impl.UserAuthService;
import org.junit.Test;

public class UserAuthControllerTest {
    private UserAuthController controller = new UserAuthController(new UserAuthService(new StudentDao(), new TeacherDao(),
            new EncryptService()));

    @Test
    public void test() {
        TeacherEntity teacherEntity = new TeacherEntity();
        teacherEntity.setPassword("123123123");
        teacherEntity.setTeacherNo("161250051");
        teacherEntity.setTeacherEmail("laikinemngpatrick@gmail.com");
        teacherEntity.setName("賴健明");
        controller.registry(teacherEntity);
    }
}
