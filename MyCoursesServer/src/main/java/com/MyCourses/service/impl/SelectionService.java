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
import com.MyCourses.exceptions.*;
import com.MyCourses.service.IMailService;
import com.MyCourses.service.ISelectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SelectionService implements ISelectionService {

    private final ISelectionDAO selectionDAO;
    private final IReleasementDAO releasementDAO;
    private final IStudentDAO studentDAO;
    private final IMailService mailService;

    private final static Logger logger = LoggerFactory.getLogger(VerifyService.class);


    @Autowired
    public SelectionService(ISelectionDAO selectionDAO, IReleasementDAO releasementDAO, IStudentDAO studentDAO, IMailService mailService) {
        this.selectionDAO = selectionDAO;
        this.releasementDAO = releasementDAO;
        this.studentDAO = studentDAO;
        this.mailService = mailService;
    }


    private boolean isAlreadySelected(StudentEntity studentEntity, ReleasementEntity releasementEntity) {
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByReleasement(releasementEntity);
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (!selectionEntity.getSelectionState().equals(SelectionState.DROPPED) && studentEntity.getStudentEmail().equals(selectionEntity.getStudentEntity().getStudentEmail())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<SelectionEntity> getAll() {
        return selectionDAO.retrieveAll();
    }

    @Override
    public List<SelectionEntity> getActiveSelectionOfReleasement(Long releasementId) {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(releasementId);
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByReleasement(releasementEntity);
        List<SelectionEntity> ret = new ArrayList<>();
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (!selectionEntity.getSelectionState().equals(SelectionState.DROPPED)
                    && !selectionEntity.getSelectionState().equals(SelectionState.MISS)
            )
                ret.add(selectionEntity);
        }
        return ret;
    }

    @Override
    public List<SelectionEntity> getAllSelectionOfReleasement(Long releasementId) {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(releasementId);
        return selectionDAO.retrieveByReleasement(releasementEntity);
    }

    @Override
    public SelectionState select(String studentEmail, Long rid) throws ReleasementNotExistException, StudentNotExistException, RepeatSelectCourseException, SelectionFailExceptions {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        if (studentEntity == null)
            throw new StudentNotExistException();
        if (releasementEntity == null)
            throw new ReleasementNotExistException();
        if (isAlreadySelected(studentEntity, releasementEntity))
            throw new RepeatSelectCourseException();

        List<SelectionEntity> selectionEntities = this.getActiveSelectionOfReleasement(releasementEntity.getRid());

        SelectionState selectionState;
        long now = new Date().getTime();
        if (releasementEntity.isActive() && selectionEntities.size() < releasementEntity.getLimitNumber()) {
            selectionState = SelectionState.BY_SELECTED;
        } else if (releasementEntity.isActive() && selectionEntities.size() >= releasementEntity.getLimitNumber()) {
            throw new SelectionFailExceptions("補選失敗，人數已滿");
        } else if (now >= releasementEntity.getDeadTime().getTime()) {
            throw new SelectionFailExceptions("選課失敗，課程已失效");
        } else {
            selectionState = selectionEntities.size() > releasementEntity.getLimitNumber() ?
                    SelectionState.OVER : SelectionState.ADDED;
        }
        SelectionEntity selectionEntity = new SelectionEntity();
        selectionEntity.setStudentEntity(studentEntity);
        selectionEntity.setReleasementEntity(releasementEntity);
        selectionEntity.setSelectionState(selectionState);
        selectionEntity.setSelectTime(new Date());
        selectionDAO.create(selectionEntity);
        return selectionState;
    }


    @Override
    public List<SelectionEntity> getActiveSelectionOf(String studentEmail) {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByStudent(studentEntity);
        List<SelectionEntity> ret = new ArrayList<>();
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (!selectionEntity.getSelectionState().equals(SelectionState.DROPPED) && !selectionEntity.getSelectionState().equals(SelectionState.MISS) && selectionEntity.getReleasementEntity().isActive()) {
                ret.add(selectionEntity);
            }
        }
        return ret;
    }

    @Override
    public List<SelectionEntity> getAllSelectionOf(String studentEmail) throws StudentNotExistException {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        if (studentEntity == null)
            throw new StudentNotExistException();
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByStudent(studentEntity);
        List<SelectionEntity> ret = new ArrayList<>();
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (selectionEntity.getStudentEntity().getStudentEmail().equals(studentEmail))
                ret.add(selectionEntity);
        }
        return ret;
    }

    @Override
    public SelectionEntity getSelectionBySlid(Long slid) throws SelectionNotExistException {
        SelectionEntity selectionEntity = selectionDAO.retrieveBySlid(slid);
        if (selectionEntity == null)
            throw new SelectionNotExistException();
        return selectionEntity;
    }

    @Override
    public void broadCastEmailToSelector(Long releasementId, String content) throws MailSendingException, SelectionNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(releasementId);
        List<SelectionEntity> selectionEntityList = selectionDAO.retrieveByReleasement(releasementEntity);
        if (selectionEntityList == null || selectionEntityList.isEmpty()) {
            throw new SelectionNotExistException("沒有學生選課");
        }
        for (SelectionEntity selectionEntity : selectionEntityList) {
            if (selectionEntity.getSelectionState().equals(SelectionState.MISS) || selectionEntity.getSelectionState().equals(SelectionState.DROPPED))
                continue;

            String subject =
                    releasementEntity.getCourseEntity().getName() + " 群發郵件";
            String studentEmail = selectionEntity.getStudentEntity().getStudentEmail();
            String wrappedContent = content +
                    "\n教師聯系方式：" + releasementEntity.getCourseEntity().getTeacherEntity().getTeacherEmail() +
                    "\n教師：" + releasementEntity.getCourseEntity().getTeacherEntity().getName();
            mailService.sendSimpleMail(studentEmail, subject, wrappedContent);
            logger.info("已發送郵件至 {}", studentEmail);
            logger.info("郵件內容為 {}", wrappedContent);
        }
    }

    @Override
    public void drop(Long slid) throws SelectionNotExistException, DropSelectionException {
        SelectionEntity selectionEntity = getSelectionBySlid(slid);
        if (selectionEntity.getSelectionState().equals(SelectionState.DROPPED)) {
            throw new DropSelectionException("已經退選了");
        }
        if (selectionEntity.getSelectionState().equals(SelectionState.MISS)) {
            throw new DropSelectionException("你並沒有選上");
        }
        selectionEntity.setSelectionState(SelectionState.DROPPED);
        selectionDAO.update(selectionEntity);
    }
}
