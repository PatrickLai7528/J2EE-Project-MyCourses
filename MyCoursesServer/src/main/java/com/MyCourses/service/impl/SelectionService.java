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
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.RepeatSelectCourseException;
import com.MyCourses.exceptions.SelectionNotExistException;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.service.ISelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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


    private boolean isAlreadySelected(StudentEntity studentEntity, ReleasementEntity releasementEntity) {
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByReleasement(releasementEntity);
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (studentEntity.getStudentEmail().equals(selectionEntity.getStudentEntity().getStudentEmail()))
                return true;
        }
        return false;
    }

    @Override
    public SelectionState select(String studentEmail, Long rid) throws ReleasementNotExistException, StudentNotExistException, RepeatSelectCourseException {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        if (studentEntity == null)
            throw new StudentNotExistException();
        if (releasementEntity == null)
            throw new ReleasementNotExistException();
        if (isAlreadySelected(studentEntity, releasementEntity))
            throw new RepeatSelectCourseException();

        List<SelectionEntity> selectionEntities = selectionDAO.retrieveByReleasement(releasementEntity);
        SelectionState selectionState = selectionEntities.size() > releasementEntity.getLimitNumber() ?
                SelectionState.OVER : SelectionState.ADDED;
        SelectionEntity selectionEntity = new SelectionEntity();
        selectionEntity.setStudentEntity(studentEntity);
        selectionEntity.setReleasementEntity(releasementEntity);
        selectionEntity.setSelectionState(selectionState);
        selectionEntity.setSelectTime(new Date());
        selectionDAO.create(selectionEntity);
        return selectionState;
    }

    @Override
    public List<SelectionEntity> getSelectionOf(String studentEmail) {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        return selectionDAO.retrieveByStudent(studentEntity);
    }

    @Override
    public SelectionEntity getSelectionBySlid(Long slid) throws SelectionNotExistException {
        SelectionEntity selectionEntity = selectionDAO.retrieveBySlid(slid);
        if(selectionEntity == null)
            throw new SelectionNotExistException();
        return selectionEntity;
    }
}
