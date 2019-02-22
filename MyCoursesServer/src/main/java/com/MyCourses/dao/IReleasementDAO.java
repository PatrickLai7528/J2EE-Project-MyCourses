package com.MyCourses.dao;/*
 * @PackageName com.MyCourses.dao
 * @ClassName IReleasementDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.ReleasementEntity;

import java.util.List;

public interface IReleasementDAO extends IGeneralDAO<ReleasementEntity>{

    ReleasementEntity retrieveByRid(Long rid);

}
