package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName ForumService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.dao.IStudentDAO;
import com.MyCourses.dao.ITeacherDAO;
import com.MyCourses.entity.ForumEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.StudentEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ForumService implements IForumService {

    private final IReleasementDAO releasementDAO;
    private final ITeacherDAO teacherDAO;
    private final IStudentDAO studentDAO;

    @Autowired
    public ForumService(IReleasementDAO releasementDAO, ITeacherDAO teacherDAO, IStudentDAO studentDAO) {
        this.releasementDAO = releasementDAO;
        this.teacherDAO = teacherDAO;
        this.studentDAO = studentDAO;
    }

    @Override
    public void addForum(String topic, String questioner, Long rid) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null) throw new ReleasementNotExistException();

        TeacherEntity teacherEntity = teacherDAO.retrieveByEmail(questioner);
        StudentEntity studentEntity = studentDAO.retrieveByEmail(questioner);
        if (teacherEntity != null && studentEntity != null) {
            throw new IllegalStateException("學生和老師的郵箱相同");
        }


        List<ForumEntity> forumEntityList = releasementEntity.getForumEntityList();
        if (forumEntityList == null)
            forumEntityList = new ArrayList<>();

        ForumEntity forumEntity = new ForumEntity();
        forumEntity.setTopic(topic);

        if (teacherEntity != null) forumEntity.setQuestionerTeacher(teacherEntity);
        if (studentEntity != null) forumEntity.setQuestionerStudent(studentEntity);


        forumEntityList.add(forumEntity);

        releasementEntity.setForumEntityList(forumEntityList);

        releasementDAO.update(releasementEntity);
    }
}
