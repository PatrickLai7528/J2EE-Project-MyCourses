package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName SelectionDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.ISelectionDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.StudentEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@Transactional
public class SelectionDAO implements ISelectionDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public SelectionEntity retrieveBySlid(Long slid) {
        return entityManager.find(SelectionEntity.class, slid);
    }

    @Override
    public List<SelectionEntity> retrieveByStudent(StudentEntity studentEntity) {
        String hql = "from SelectionEntity where studentEntity = :studentEntity";
        TypedQuery<SelectionEntity> query = entityManager.createQuery(hql, SelectionEntity.class);
        query.setParameter("studentEntity", studentEntity);
        return query.getResultList();
    }

    @Override
    public List<SelectionEntity> retrieveByReleasement(ReleasementEntity releasementEntity) {
        String hql = "from SelectionEntity where releasementEntity = :releasementEntity";
        TypedQuery<SelectionEntity> query = entityManager.createQuery(hql, SelectionEntity.class);
        query.setParameter("releasementEntity", releasementEntity);
        return query.getResultList();
    }

    @Override
    public void create(SelectionEntity selectionEntity) {
        entityManager.persist(selectionEntity);
    }

    @Override
    public List<SelectionEntity> retrieveAll() {
        String hql = "from SelectionEntity as s order by  s.slid";
        TypedQuery<SelectionEntity> query = entityManager.createQuery(hql, SelectionEntity.class);
        return query.getResultList();
    }

    @Override
    synchronized public void update(SelectionEntity selectionEntity) {
        SelectionEntity s = retrieveBySlid(selectionEntity.getSlid());
        s.setSelectionState(selectionEntity.getSelectionState());
//        s.setReleasementEntity(selectionEntity.getReleasementEntity());
        s.setStudentEntity(selectionEntity.getStudentEntity());
        s.setScore(selectionEntity.getScore());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(SelectionEntity selectionEntity) {
        entityManager.remove(selectionEntity);
    }
}
