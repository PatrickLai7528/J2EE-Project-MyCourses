package com.MyCourses.service.impl;

import com.MyCourses.dao.ITeacherDAO;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.TeacherRepeatedException;
import com.MyCourses.service.IEncryptService;
import com.MyCourses.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TeacherService implements ITeacherService {

    private final ITeacherDAO teacherDAO;
    private final IEncryptService encryptService;

    @Autowired
    public TeacherService(ITeacherDAO teacherDAO, IEncryptService encryptService) {
        this.teacherDAO = teacherDAO;
        this.encryptService = encryptService;
    }

    @Override
    public List<TeacherEntity> getAllTeachers() {
        return teacherDAO.retrieveAll();
    }

    @Override
    public void registry(TeacherEntity teacherEntity) throws TeacherRepeatedException {
        if (teacherDAO.exist(teacherEntity))
            throw new TeacherRepeatedException();

        teacherEntity.setRegistryTime(new Date());
        teacherEntity.setLoggedInTimes((long) 0);
        teacherEntity.setLastLogInDate(new Date());
        teacherEntity.setPassword(encryptService.encrypt(teacherEntity.getPassword()));
        teacherDAO.create(teacherEntity);
    }

    /**
     * @param teacherEntity
     * @return boolean: if the user's email exist, and the password is correct, return true,
     * if the user's email exist, and the password is wrong, return false
     * @throws TeacherNotExistException if the user's email DOES NOT exist, throw it!
     */
    @Override
    public boolean logIn(TeacherEntity teacherEntity) throws TeacherNotExistException {
        if (teacherDAO.retrieveByEmail(teacherEntity.getTeacherEmail()) == null)
            throw new TeacherNotExistException();
        String unEncryptedPassword = teacherEntity.getPassword();
        String encryptedPassword = encryptService.encrypt(unEncryptedPassword);
        TeacherEntity teacherFound = teacherDAO.retrieveByEmail(teacherEntity.getTeacherEmail());
        teacherFound.setLastLogInDate(new Date());
        long loggedInTime = teacherFound.getLoggedInTimes();
        teacherFound.setLoggedInTimes(loggedInTime + 1);
        teacherDAO.update(teacherFound);
        return teacherFound.getPassword().equals(encryptedPassword);
    }

    /**
     * @param teacherEntity
     */
    @Override
    public void logOut(TeacherEntity teacherEntity) {

    }

    @Override
    public TeacherEntity getByEmail(String email) throws TeacherNotExistException {
        TeacherEntity teacherEntity = teacherDAO.retrieveByEmail(email);
        if (teacherEntity == null) throw new TeacherNotExistException();
        return teacherEntity;
    }

    @Override
    public void update(String email, String no, String name, String newPassword, String oldPassword) throws TeacherNotExistException {
        TeacherEntity teacherEntity = getByEmail(email);
        if (newPassword != null) {   // if need to change password, you have to provide old password as well
            String encryptedOldPassword = encryptService.encrypt(oldPassword);
            if (!teacherEntity.getPassword().equals(encryptedOldPassword)) {
                throw new TeacherNotExistException("密碼錯誤");
            }
            String encrypedNewPassword = encryptService.encrypt(newPassword);
            teacherEntity.setPassword(encrypedNewPassword);
        }

        if (no != null)
            teacherEntity.setTeacherNo(no);
        if (name != null)
            teacherEntity.setName(name);
        teacherDAO.update(teacherEntity);
    }

}
