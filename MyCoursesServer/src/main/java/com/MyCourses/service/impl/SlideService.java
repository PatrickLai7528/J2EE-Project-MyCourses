package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName SlideService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SlideEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.ISlideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SlideService implements ISlideService {

    private final IReleasementDAO releasementDAO;

    @Autowired
    public SlideService(IReleasementDAO releasementDAO) {
        this.releasementDAO = releasementDAO;
    }

    @Override
    public void addSlide(String title, String filePath, Long rid) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        if (releasementEntity == null) throw new ReleasementNotExistException();

        List<SlideEntity> slideEntityList = releasementEntity.getSlideEntityList();
        if (slideEntityList == null)
            slideEntityList = new ArrayList<>();

        SlideEntity slideEntity = new SlideEntity();
        slideEntity.setTitle(title);
        slideEntity.setFilePath(filePath);

        slideEntityList.add(slideEntity);

        releasementDAO.update(releasementEntity);
    }
}
