package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName SelectionService
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.dao.ISelectionDAO;
import com.MyCourses.dao.IStudentDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.enums.SelectionState;
import com.MyCourses.entity.StudentEntity;
import com.MyCourses.service.ISelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SelectionService implements ISelectionService {

    private final ISelectionDAO selectionDAO;
    private IReleasementDAO releasementDAO;
    private IStudentDAO studentDAO;

    @Autowired
    public SelectionService(ISelectionDAO selectionDAO, IReleasementDAO releasementDAO, IStudentDAO studentDAO) {
        this.selectionDAO = selectionDAO;
        this.releasementDAO = releasementDAO;
        this.studentDAO = studentDAO;
    }

    @Override
    public SelectionState select(String studentEmail, Long rid) {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        List<SelectionEntity> selectionEntities = selectionDAO.retrieveByReleasement(releasementEntity);
        SelectionState selectionState = selectionEntities.size() > releasementEntity.getLimitNumber() ?
                SelectionState.OVER : SelectionState.ADDED;
        SelectionEntity selectionEntity = new SelectionEntity();
        selectionEntity.setStudentEntity(studentEntity);
        selectionEntity.setReleasementEntity(releasementEntity);
        selectionEntity.setSelectionState(selectionState);
        selectionDAO.create(selectionEntity);
        return selectionState;
    }

    @Override
    public List<SelectionEntity> getSelectionOf(String studentEmail) {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        return selectionDAO.retrieveByStudent(studentEntity);
    }
}
