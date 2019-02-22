package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName ISelectionService
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.enums.SelectionState;

import java.util.List;

public interface ISelectionService {
    SelectionState select(String studentEmail, Long rid);

    List<SelectionEntity> getSelectionOf(String studentEmail);
}
