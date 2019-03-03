package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName AdminDAO
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IAdminDAO;
import com.MyCourses.entity.AdminEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class AdminDAO implements IAdminDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public AdminEntity retrieveByEmail(String adminEmail) {
        return entityManager.find(AdminEntity.class, adminEmail);
    }
}
