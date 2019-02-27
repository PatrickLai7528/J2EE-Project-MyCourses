package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName SubmissionService
 * @Author Lai Kin Meng
 * @Date 2019-02-27
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.ISelectionDAO;
import com.MyCourses.dao.IStudentDAO;
import com.MyCourses.entity.AssignmentEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.StudentEntity;
import com.MyCourses.entity.SubmissionEntity;
import com.MyCourses.exceptions.AssignmentNotExistException;
import com.MyCourses.exceptions.SelectionNotExistException;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.service.ISubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SubmissionService implements ISubmissionService {

    private final IStudentDAO studentDAO;
    private ISelectionDAO selectionDAO;

    @Autowired
    public SubmissionService(IStudentDAO studentDAO, ISelectionDAO selectionDAO) {
        this.studentDAO = studentDAO;
        this.selectionDAO = selectionDAO;
    }

    @Override
    public void submitAssignment(String studentEmail, Long selectionId, Long assignmentId, String filePath) throws StudentNotExistException, SelectionNotExistException, AssignmentNotExistException {
        StudentEntity studentEntity = studentDAO.retrieveByEmail(studentEmail);
        if(studentEntity == null)
            throw new StudentNotExistException();

        SelectionEntity selectionEntity = selectionDAO.retrieveBySlid(selectionId);
        if(selectionEntity == null)
            throw new SelectionNotExistException();

        AssignmentEntity submittingAssignment = null;
        for(AssignmentEntity assignmentEntity: selectionEntity.getReleasementEntity().getAssignmentEntityList()){
            if(assignmentEntity.getAssid().equals(assignmentId))
                submittingAssignment = assignmentEntity;
        }

        if(submittingAssignment == null)
            throw new AssignmentNotExistException();

        SubmissionEntity submissionEntity = new SubmissionEntity();
        submissionEntity.setFilePath(filePath);
        submissionEntity.setStudentEntity(studentEntity);
        submissionEntity.setSubmitTime(new Date());

        List<SubmissionEntity> submissionEntityList = submittingAssignment.getSubmissionEntityList();
        if(submissionEntityList == null)
            submissionEntityList = new ArrayList<>();
        submissionEntityList.add(submissionEntity);

        selectionDAO.update(selectionEntity);

    }
}
