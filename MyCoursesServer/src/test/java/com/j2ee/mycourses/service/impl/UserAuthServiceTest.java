package com.j2ee.mycourses.service.impl;

import com.j2ee.mycourses.dao.IStudentDao;
import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.dao.impl.StudentDao;
import com.j2ee.mycourses.dao.impl.TeacherDao;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.error.StudentNotExistException;
import com.j2ee.mycourses.error.StudentRepeatedException;
import com.j2ee.mycourses.error.TeacherNotExistException;
import com.j2ee.mycourses.error.TeacherRepeatedException;
import com.j2ee.mycourses.service.IEncryptService;
import com.j2ee.mycourses.service.IUserAuthService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class UserAuthServiceTest {

    private IStudentDao studentDao = new StudentDao();
    private ITeacherDao teacherDao = new TeacherDao();
    private IEncryptService encryptService = new EncryptService();
    private IUserAuthService userAuthService = new UserAuthService(studentDao, teacherDao, encryptService);

    private static StudentEntity studentEntity;
    private static TeacherEntity teacherEntity;

    static {
        studentEntity = new StudentEntity();
        teacherEntity = new TeacherEntity();

        studentEntity.setEmail("161250051@smail.nju.edu.cn");
        studentEntity.setPassword("161250051");
        studentEntity.setStudentNo("161250051");
        studentEntity.setDeleted(false);
        studentEntity.setName("賴健明");


        teacherEntity.setTeacherNo((long) 123456);
        teacherEntity.setName("teacher haha");
        teacherEntity.setTeacherEmail("teacher@smail.nju.edu.cn");
        teacherEntity.setPassword("123123");
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
        studentDao.physicalDelete(studentEntity);
        teacherDao.physicalDelete(teacherEntity);
    }

    @Test
    public void studentRegistry() {
        try {
            userAuthService.registry(studentEntity);
        } catch (StudentRepeatedException e) {
            e.printStackTrace();
        }
    }

    @Test(expected = StudentRepeatedException.class)
    public void studentRegistryTwice() throws StudentRepeatedException {
        userAuthService.registry(studentEntity);
        userAuthService.registry(studentEntity);
    }

    @Test()
    public void studentRegistryAfterLogicalDelete() throws StudentRepeatedException, StudentNotExistException {
        userAuthService.registry(studentEntity);
        userAuthService.logOff(studentEntity);
        userAuthService.registry(studentEntity);
    }

    @Test
    public void studentLogIn() throws StudentRepeatedException, StudentNotExistException {
        // normal case
        userAuthService.registry(studentEntity);
        studentEntity.setPassword("161250051");
        assertTrue(userAuthService.logIn(studentEntity));

        studentEntity.setPassword("this is wrong password");
        assertFalse(userAuthService.logIn(studentEntity));
    }

    @Test(expected = StudentNotExistException.class)
    public void studentLogInWithNotExist() throws StudentNotExistException {
        studentEntity.setEmail("jljlkljl@jlkjl.com");
        userAuthService.logIn(studentEntity);
    }

    @Test
    public void teacherLogInAfterRegistry() throws TeacherRepeatedException, TeacherNotExistException {
        userAuthService.registry(teacherEntity);
        teacherEntity.setPassword("123123");
        assertTrue(userAuthService.logIn(teacherEntity));
    }

    @Test(expected = TeacherNotExistException.class)
    public void teacherLogInWithoutRegistry() throws TeacherNotExistException {
        userAuthService.logIn(teacherEntity);
    }

    @Test(expected = TeacherRepeatedException.class)
    public void teacherRegistryTwice() throws TeacherRepeatedException {
        userAuthService.registry(teacherEntity);
        userAuthService.registry(teacherEntity);
    }
}
