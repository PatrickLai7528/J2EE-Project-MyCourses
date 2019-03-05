package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName AdminService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IAdminDAO;
import com.MyCourses.dao.ICourseDAO;
import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.AdminEntity;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.exceptions.*;
import com.MyCourses.service.IAdminService;
import com.MyCourses.service.IReleasementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService implements IAdminService {


    private final IAdminDAO adminDAO;
    private final ICourseDAO courseDAO;
    private final IReleasementDAO releasementDAO;

    @Autowired
    public AdminService(IAdminDAO adminDAO, ICourseDAO courseDAO, IReleasementDAO releasementDAO) {
        this.adminDAO = adminDAO;
        this.courseDAO = courseDAO;
        this.releasementDAO = releasementDAO;
    }

    @Override
    public boolean logIn(AdminEntity adminEntity) throws AdminNotExistException {
        AdminEntity found = adminDAO.retrieveByEmail(adminEntity.getAdminEmail());
        if(found == null)
            throw new AdminNotExistException();
        return found.getPassword().equals(adminEntity.getPassword());
    }

    @Override
    public void approveCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException {
        CourseEntity courseEntity = courseDAO.retrieveByCid(cid);
        if (courseEntity == null)
            throw new CourseNotExistException();
        if (courseEntity.getIsReleased())
            throw new CourseAlreadyReleaseException();
        courseEntity.setApprovalState(ApprovalState.APPROVED);
        courseDAO.update(courseEntity);
    }

    @Override
    public void rejectCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException {
        CourseEntity courseEntity = courseDAO.retrieveByCid(cid);
        if (courseEntity == null)
            throw new CourseNotExistException();
        if (courseEntity.getIsReleased())
            throw new CourseAlreadyReleaseException();
        courseEntity.setApprovalState(ApprovalState.REJECTED);
        courseDAO.update(courseEntity);
    }

    @Override
    public void approveReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null)
            throw new ReleasementNotExistException();
        if (releasementEntity.isActive())
            throw new ReleasementAlreadyPassEffectiveTimeException("課程已經失效");
        releasementEntity.setApprovalState(ApprovalState.APPROVED);
        releasementDAO.update(releasementEntity);
    }

    @Override
    public void rejectReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null)
            throw new ReleasementNotExistException();
        if (releasementEntity.isActive())
            throw new ReleasementAlreadyPassEffectiveTimeException("課程已經開始");
        releasementEntity.setApprovalState(ApprovalState.REJECTED);
        releasementDAO.update(releasementEntity);
    }
}
