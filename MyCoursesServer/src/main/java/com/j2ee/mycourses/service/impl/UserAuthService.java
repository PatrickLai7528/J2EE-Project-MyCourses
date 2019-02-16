package com.j2ee.mycourses.service.impl;

/*
 * @PackageName com.j2ee.mycourses.service.impl
 * @ClassName StudentService
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IStudentDao;
import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.error.StudentNotExistException;
import com.j2ee.mycourses.error.StudentRepeatedException;
import com.j2ee.mycourses.error.TeacherNotExistException;
import com.j2ee.mycourses.error.TeacherRepeatedException;
import com.j2ee.mycourses.service.IEncryptService;
import com.j2ee.mycourses.service.IUserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService implements IUserAuthService {
    private final IStudentDao studentDao;
    private final ITeacherDao teacherDao;
    private final IEncryptService encryptService;


    @Autowired
    public UserAuthService(IStudentDao studentDao, ITeacherDao teacherDao, IEncryptService encryptService) {
        this.studentDao = studentDao;
        this.encryptService = encryptService;
        this.teacherDao = teacherDao;
    }

    @Override
    public void registry(TeacherEntity teacherEntity) throws TeacherRepeatedException {
        if (teacherDao.retrieveByEmail(teacherEntity.getEmail()) != null)
            throw new TeacherRepeatedException();

        teacherEntity.setPassword(encryptService.encrypt(teacherEntity.getPassword()));
        teacherDao.create(teacherEntity);
    }

    /**
     * @param studentEntity
     * @throws StudentRepeatedException
     */
    @Override
    public void registry(StudentEntity studentEntity) throws StudentRepeatedException {
        StudentEntity found = studentDao.retrieveByEmail(studentEntity.getEmail());
        // student email is used, but it HAS NOT been logical deleted
        if (found != null && !found.getDeleted()) {
            throw new StudentRepeatedException();
        }
        // student email is used, and it HAS been logical deleted
        else if (found != null && found.getDeleted()) {
            found.setName(studentEntity.getName());
            found.setDeleted(false);
            found.setStudentNo(studentEntity.getStudentNo());
            found.setPassword(encryptService.encrypt(studentEntity.getPassword()));
            studentDao.update(found);
        }
        // student email IS NOT used
        else {
            studentEntity.setPassword(encryptService.encrypt(studentEntity.getPassword()));
            studentDao.create(studentEntity);
        }


    }

    @Override
    public boolean logIn(TeacherEntity teacherEntity) throws TeacherNotExistException {
        if (teacherDao.retrieveByEmail(teacherEntity.getEmail()) == null)
            throw new TeacherNotExistException();
        String unEncryptedPassword = teacherEntity.getPassword();
        String encryptedPassword = encryptService.encrypt(unEncryptedPassword);
        TeacherEntity teacherFound = teacherDao.retrieveByEmail(teacherEntity.getEmail());
        return teacherFound.getPassword().equals(encryptedPassword);
    }

    /**
     * @param studentEntity
     * @return boolean: if the user's email exist, and the password is correct, return true,
     * if the user's email exist, and the password is wrong, return false
     * @throws StudentNotExistException if the user's email DOES NOT exist, throw it!
     */
    @Override
    public boolean logIn(StudentEntity studentEntity) throws StudentNotExistException {
        if (studentDao.retrieveByEmail(studentEntity.getEmail()) == null)
            throw new StudentNotExistException();

        String unEncryptedPassword = studentEntity.getPassword();
        String encryptedPassword = encryptService.encrypt(unEncryptedPassword);
        StudentEntity studentFound = studentDao.retrieveByEmail(studentEntity.getEmail());
        return studentFound.getPassword().equals(encryptedPassword);
    }

    @Override
    public void logOut(TeacherEntity teacherEntity) {

    }

    @Override
    public void logOut(StudentEntity studentEntity) {

    }

    @Override
    public void logOff(StudentEntity studentEntity) throws StudentNotExistException {
        StudentEntity found = studentDao.retrieveByEmail(studentEntity.getEmail());
        System.out.println(found);
        if (found == null)
            throw new StudentNotExistException();

        studentDao.logicalDelete(studentEntity);
    }
}
