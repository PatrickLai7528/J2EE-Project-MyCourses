package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName ISubmissionService
 * @Author Lai Kin Meng
 * @Date 2019-02-27
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.AssignmentNotExistException;
import com.MyCourses.exceptions.SelectionNotExistException;
import com.MyCourses.exceptions.StudentNotExistException;

public interface ISubmissionService {

    public void submitAssignment(String studentEmail, Long selectionId, Long assignmentId, String filePath) throws StudentNotExistException, SelectionNotExistException, AssignmentNotExistException;
}
