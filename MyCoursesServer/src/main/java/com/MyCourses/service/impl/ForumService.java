package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName ForumService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.ForumEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ForumService implements IForumService {

    private final IReleasementDAO releasementDAO;

    @Autowired
    public ForumService(IReleasementDAO releasementDAO) {
        this.releasementDAO = releasementDAO;
    }

    @Override
    public void addForum(String topic, Long rid) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null) throw new ReleasementNotExistException();

        List<ForumEntity> forumEntityList = releasementEntity.getForumEntityList();
        if (forumEntityList == null)
            forumEntityList = new ArrayList<>();

        ForumEntity forumEntity = new ForumEntity();
        forumEntity.setTopic(topic);

        forumEntityList.add(forumEntity);

        releasementEntity.setForumEntityList(forumEntityList);

        releasementDAO.update(releasementEntity);
    }
}
