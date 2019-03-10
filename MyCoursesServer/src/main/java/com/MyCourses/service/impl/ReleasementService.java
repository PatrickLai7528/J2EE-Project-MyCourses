package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName ReleasementService
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.dao.ITeacherDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.IReleasementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReleasementService implements IReleasementService {

    private final IReleasementDAO releasementDAO;
    private final ITeacherDAO teacherDAO;

    @Autowired
    public ReleasementService(IReleasementDAO releasementDAO, ITeacherDAO teacherDAO) {
        this.releasementDAO = releasementDAO;
        this.teacherDAO = teacherDAO;
    }

    @Override
    public List<ReleasementEntity> getAll() {
        List<ReleasementEntity> ret = releasementDAO.retrieveAll();
        return ret;
    }

    @Override
    public List<ReleasementEntity> getApproved() {
        List<ReleasementEntity> all = getAll();
        List<ReleasementEntity> available = new ArrayList<>();
        for (ReleasementEntity releasementEntity : all) {
           if(releasementEntity.getApprovalState() == ApprovalState.APPROVED)
               available.add(releasementEntity);
        }
        return available;
    }


    @Override
    public List<ReleasementEntity> getReleasementOf(String teacherEmail) throws TeacherNotExistException {
        if (teacherDAO.retrieveByEmail(teacherEmail) == null)
            throw new TeacherNotExistException();

        List<ReleasementEntity> all = getAll();
        List<ReleasementEntity> ret = new ArrayList<>();
        for (ReleasementEntity releasementEntity : all) {
            if (releasementEntity.getCourseEntity().getTeacherEntity().getTeacherEmail().equals(teacherEmail)) {
                ret.add(releasementEntity);
            }
        }
        return ret;
    }

    @Override
    public ReleasementEntity getReleasementByRid(Long rid) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null) throw new ReleasementNotExistException();
        return releasementEntity;
    }

}
