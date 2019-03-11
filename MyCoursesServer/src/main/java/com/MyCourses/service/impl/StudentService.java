package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName StudentService
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.IStudentDAO;
import com.MyCourses.entity.StudentEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.exceptions.StudentRepeatedException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.IEncryptService;
import com.MyCourses.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class StudentService implements IStudentService {

    private final IStudentDAO studentDAO;
    private final IEncryptService encryptService;

    @Autowired
    public StudentService(IStudentDAO studentDAO, IEncryptService encryptService) {
        this.studentDAO = studentDAO;
        this.encryptService = encryptService;
    }

    @Override
    public List<StudentEntity> getAllStudents() {
        return studentDAO.retrieveAll();
    }

    @Override
    public void registry(StudentEntity studentEntity) throws StudentRepeatedException {
        if (studentDAO.exists(studentEntity))
            throw new StudentRepeatedException();
        studentEntity.setRegistryTime(new Date());
        studentEntity.setLastLogInDate(new Date());
        studentEntity.setLoggedInTimes((long) 0);
        studentEntity.setPassword(encryptService.encrypt(studentEntity.getPassword()));
        studentDAO.create(studentEntity);
    }

    @Override
    public boolean logIn(StudentEntity studentEntity) throws StudentNotExistException {
        StudentEntity found = studentDAO.retrieveByEmail(studentEntity.getStudentEmail());
        if (found == null)
            throw new StudentNotExistException();

        studentEntity.setStudentNo(found.getStudentNo());

        if (!studentDAO.exists(studentEntity))
            throw new StudentNotExistException();

        String unEncryptedPassword = studentEntity.getPassword();
        String encryptedPassword = encryptService.encrypt(unEncryptedPassword);
        StudentEntity studentFound = studentDAO.retrieveByEmail(studentEntity.getStudentEmail());
        studentFound.setLastLogInDate(new Date());
        long loggedInTimes = studentFound.getLoggedInTimes();
        studentFound.setLoggedInTimes(loggedInTimes + 1);
        studentDAO.update(studentFound);
        return studentFound.getPassword().equals(encryptedPassword);
    }

    @Override
    public void logOut(StudentEntity studentEntity) {

    }

    @Override
    public StudentEntity getByEmail(String email) throws StudentNotExistException {
        StudentEntity studentEntity = this.studentDAO.retrieveByEmail(email);
        if (studentEntity == null)
            throw new StudentNotExistException();
        return studentEntity;
    }

    @Override
    public void update(String email, String studentNo, String name, String oldPassword, String newPassword) throws StudentNotExistException {
        StudentEntity studentEntity = getByEmail(email);
        if (newPassword != null) {   // if need to change password, you have to provide old password as well
            String encrypedOldPassword = encryptService.encrypt(oldPassword);
            if (!studentEntity.getPassword().equals(encrypedOldPassword)) {
                throw new StudentNotExistException("密碼錯誤");
            }
            String encryptedNewPassword = encryptService.encrypt(newPassword);
            studentEntity.setPassword(encryptedNewPassword);
        }

        if (studentNo != null)
            studentEntity.setStudentNo(studentNo);
        if (name != null)
            studentEntity.setName(name);
        studentDAO.update(studentEntity);
    }
}
