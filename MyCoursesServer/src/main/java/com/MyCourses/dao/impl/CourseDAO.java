package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName CourseDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.ICourseDAO;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.TeacherEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Transactional
@Repository
public class CourseDAO implements ICourseDAO {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public CourseEntity retrieveByCid(Long cid) {
        return entityManager.find(CourseEntity.class, cid);
    }

    @Override
    public List<CourseEntity> retrieveByName(String name) {
        String hql = "from CourseEntity where name = :name";
        Query query = entityManager.createQuery(hql);
        query.setParameter("name", name);
        return (List<CourseEntity>) query.getResultList();
    }

    @Override
    public List<CourseEntity> retrieveByTeacherEntity(TeacherEntity teacherEntity) {
        String hql = "from CourseEntity where teacherEntity = :teacherEntity";
        Query query = entityManager.createQuery(hql);
        query.setParameter("teacherEntity", teacherEntity);
        return (List<CourseEntity>) query.getResultList();
    }

    @Override
    public void create(CourseEntity courseEntity) {
        entityManager.persist(courseEntity);
    }

    @Override
    public List<CourseEntity> retrieveAll() {
        String hql = "from CourseEntity as c ORDER BY c.cid";
        List<CourseEntity> ret = (List<CourseEntity>) entityManager.createQuery(hql).getResultList();
        return ret;
    }

    @Override
    public void update(CourseEntity courseEntity) {
        CourseEntity c = retrieveByCid(courseEntity.getCid());
//        c.setAssignmentEntityList(courseEntity.getAssignmentEntityList());
//        c.setForumEntityList(courseEntity.getForumEntityList());
        c.setName(courseEntity.getName());
//        c.setReportCardEntity(courseEntity.getReportCardEntity());
//        c.setSlideEntityList(courseEntity.getSlideEntityList());
        c.setApprovalState(courseEntity.getApprovalState());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(CourseEntity courseEntity) {
        entityManager.remove(courseEntity);
    }
}
