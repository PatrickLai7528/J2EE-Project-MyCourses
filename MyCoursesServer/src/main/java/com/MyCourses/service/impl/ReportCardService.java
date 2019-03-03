package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName ReportCardService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.ISelectionDAO;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.SelectionNotExistException;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.IReportCardService;
import com.MyCourses.service.ISelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportCardService implements IReportCardService {

    private final ISelectionService selectionService;
    private final ISelectionDAO selectionDAO;
    private final IReleasementService releasementService;

    @Autowired
    public ReportCardService(ISelectionService selectionService, ISelectionDAO selectionDAO, IReleasementService releasementService) {
        this.selectionService = selectionService;
        this.selectionDAO = selectionDAO;
        this.releasementService = releasementService;
    }

    @Override
    public void addScore(Long slid, double score) throws SelectionNotExistException {
        SelectionEntity selectionEntity = selectionService.getSelectionBySlid(slid);
        selectionEntity.setScore(score);
        selectionDAO.update(selectionEntity);
    }

}
