package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName ReleasementDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.StudentEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ReleasementDAO implements IReleasementDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(ReleasementEntity releasementEntity) {
        entityManager.persist(releasementEntity);
    }

    @Override
    public List<ReleasementEntity> retrieveAll() {
        String hql = "from ReleasementEntity as r order by r.rid";
        return (List<ReleasementEntity>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public void update(ReleasementEntity releasementEntity) {
//        StudentEntity s = retrieveByEmail(studentEntity.getStudentEmail());
//        s.setName(studentEntity.getName());
//        s.setPassword(studentEntity.getPassword());
//        s.setStudentNo(studentEntity.getStudentNo());
//        entityManager.flush();
        ReleasementEntity r = retrieveByRid(releasementEntity.getRid());
        r.setCourseEntity(releasementEntity.getCourseEntity());
        r.setDeadTime(releasementEntity.getDeadTime());
        r.setEffectiveTime(releasementEntity.getEffectiveTime());
        r.setEndHour(releasementEntity.getEndHour());
        r.setEndMin(releasementEntity.getEndMin());
        r.setStartHour(releasementEntity.getStartHour());
        r.setStartMin(releasementEntity.getStartMin());
        r.setRepeatAfterNDay(releasementEntity.getRepeatAfterNDay());
        r.setLimitNumber(releasementEntity.getLimitNumber());
        r.setApprovalState(releasementEntity.getApprovalState());
        r.setAssignmentEntityList(releasementEntity.getAssignmentEntityList());
        r.setForumEntityList(releasementEntity.getForumEntityList());
        r.setSlideEntityList(releasementEntity.getSlideEntityList());
        r.setReportCardEntity(releasementEntity.getReportCardEntity());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(ReleasementEntity releasementEntity) {
        entityManager.remove(releasementEntity);
    }

    @Override
    public ReleasementEntity retrieveByRid(Long rid) {
        return entityManager.find(ReleasementEntity.class, rid);
    }
}
