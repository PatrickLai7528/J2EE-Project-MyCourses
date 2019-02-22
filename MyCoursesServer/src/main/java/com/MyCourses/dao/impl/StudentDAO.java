package com.MyCourses.dao.impl;
/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName StudentDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.IStudentDAO;
import com.MyCourses.entity.StudentEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public class StudentDAO implements IStudentDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StudentEntity retrieveByEmail(String email) {
        return entityManager.find(StudentEntity.class, email);
    }

    @Override
    public StudentEntity retrieveByStudentNo(String studentNo) {
        return entityManager.find(StudentEntity.class, studentNo);
    }

    @Override
    public void logicalDelete(StudentEntity studentEntity) {
        studentEntity.setDeleted(true);
        update(studentEntity);
    }

    @Override
    public boolean exists(StudentEntity studentEntity) {
        if (studentEntity.getStudentEmail() != null) {
            StudentEntity found = retrieveByEmail(studentEntity.getStudentEmail());
            return found != null;
        }
        if (studentEntity.getStudentNo() != null) {
            StudentEntity found = retrieveByStudentNo(studentEntity.getStudentNo());
            return found != null;
        }
        throw new IllegalArgumentException("學生實體類沒有郵箱和學號");
    }

    @Override
    public void create(StudentEntity studentEntity) {
        entityManager.persist(studentEntity);
    }

    @Override
    public List<StudentEntity> retrieveAll() {
        String hql = "from StudentEntity as s ORDER BY s.studentEmail";
        return (List<StudentEntity>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public void update(StudentEntity studentEntity) {
        StudentEntity s = retrieveByEmail(studentEntity.getStudentEmail());
        s.setName(studentEntity.getName());
        s.setPassword(studentEntity.getPassword());
        s.setStudentNo(studentEntity.getStudentNo());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(StudentEntity studentEntity) {
        entityManager.remove(studentEntity);
    }
}
