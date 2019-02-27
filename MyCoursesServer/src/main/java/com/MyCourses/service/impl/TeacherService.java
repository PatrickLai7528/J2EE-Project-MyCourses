package com.MyCourses.service.impl;

import java.util.Date;
import java.util.List;

import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.TeacherRepeatedException;
import com.MyCourses.service.IEncryptService;
import com.MyCourses.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyCourses.dao.ITeacherDAO;

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

//    @Override
//    public TeacherEntity getEmail(String email) {
//        TeacherEntity obj = teacherDAO.retrieveByEmail(email);
//        return obj;
//    }

    @Override
    public void registry(TeacherEntity teacherEntity) throws TeacherRepeatedException {
        if (teacherDAO.exist(teacherEntity))
            throw new TeacherRepeatedException();

        teacherEntity.setRegistryTime(new Date());
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

//    @Override
//    public void updateTeacher(TeacherEntity teacherEntity) {
//        teacherDAO.update(teacherEntity);
//    }

//    @Override
//    public void deleteTeacher(String email) {
//        teacherDAO.physicalDelete(teacherDAO.retrieveByEmail(email));
//    }


    //	@Override
//	public TeacherEntity getArticleById(int articleId) {
//		TeacherEntity obj = teacherDAO.getArticleById(articleId);
//		return obj;
//	}
//	@Override
//	public List<TeacherEntity> getAllArticles(){
//		return teacherDAO.getAllArticles();
//	}
//	@Override
//	public synchronized boolean addArticle(TeacherEntity teacherEntity){
//       if (teacherDAO.articleExists(teacherEntity.getTitle(), teacherEntity.getCategory())) {
//    	   return false;
//       } else {
//    	   teacherDAO.addArticle(teacherEntity);
//    	   return true;
//       }
//	}
//	@Override
//	public void updateArticle(TeacherEntity teacherEntity) {
//		teacherDAO.updateArticle(teacherEntity);
//	}
//	@Override
//	public void deleteArticle(int articleId) {
//		teacherDAO.deleteArticle(articleId);
//	}
}
