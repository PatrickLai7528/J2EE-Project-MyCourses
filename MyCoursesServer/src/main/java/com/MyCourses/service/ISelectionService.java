package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName ISelectionService
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.enums.SelectionState;
import com.MyCourses.exceptions.*;

import java.util.List;

public interface ISelectionService {

    List<SelectionEntity> getAll();

    // active means SelectionState != MISS and != DROPPED
    List<SelectionEntity> getActiveSelectionOfReleasement(Long releasementId);

    List<SelectionEntity> getAllSelectionOfReleasement(Long releasemedId);

    SelectionState select(String studentEmail, Long rid) throws ReleasementNotExistException, StudentNotExistException, RepeatSelectCourseException, SelectionFailExceptions;

    List<SelectionEntity> getActiveSelectionOf(String studentEmail);

    List<SelectionEntity> getAllSelectionOf(String studentEmail) throws StudentNotExistException;

    SelectionEntity getSelectionBySlid(Long slid) throws SelectionNotExistException;

    void broadCastEmailToSelector(Long releasementId, String content) throws MailSendingException, SelectionNotExistException;

    void drop(Long slid) throws SelectionNotExistException, DropSelectionException;
}

