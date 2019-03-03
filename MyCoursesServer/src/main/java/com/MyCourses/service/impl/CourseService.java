package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service
 * @ClassName CourseService
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */


import com.MyCourses.dao.ICourseDAO;
import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.exceptions.*;
import com.MyCourses.service.ICourseService;
import com.MyCourses.service.ITeacherService;
import com.MyCourses.service.ReleaseConfig;
import com.MyCourses.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class CourseService implements ICourseService {
    private final ICourseDAO courseDAO;
    private final IReleasementDAO releasementDAO;
    private final ITeacherService teacherService;

    @Autowired
    public CourseService(ICourseDAO courseDAO, IReleasementDAO releasementDAO, ITeacherService teacherService) {
        this.courseDAO = courseDAO;
        this.releasementDAO = releasementDAO;
        this.teacherService = teacherService;
    }

    @Override
    public List<CourseEntity> getAllCourses() {
        List<CourseEntity> ret = courseDAO.retrieveAll();
        return ret;
    }

    @Override
    public List<CourseEntity> getCoursesByTeacherEmail(String teacherEmail) throws TeacherNotExistException {
        TeacherEntity teacherEntity = teacherService.getByEmail(teacherEmail);
        return courseDAO.retrieveByTeacherEntity(teacherEntity);
    }

    @Override
    public void add(CourseEntity courseEntity) throws CourseHasNoTeacherException {
        if (courseEntity.getTeacherEntity() == null)
            throw new CourseHasNoTeacherException();
        courseEntity.setApprovalState(ApprovalState.WAITING);
        courseEntity.setIsReleased(false);
        courseEntity.setAddTime(new Date());
        courseDAO.create(courseEntity);
    }

    @Override
    public void release(Long cid, Map<String, String> config) throws CourseNotExistException, UnexpectedReleaseConfig, ReleasementDateException {
        CourseEntity courseEntity = courseDAO.retrieveByCid(cid);
        if (courseEntity == null)
            throw new CourseNotExistException();

        ReleasementEntity releasementEntity = new ReleasementEntity();
        courseEntity.setIsReleased(true);
        try {
            releasementEntity.setReleaseTime(new Date());
            releasementEntity.setApprovalState(ApprovalState.WAITING);
            releasementEntity.setCourseEntity(courseEntity);
            releasementEntity.setStartMin(Integer.parseInt(config.get(ReleaseConfig.START_MIN)));
            releasementEntity.setStartHour(Integer.parseInt(config.get(ReleaseConfig.START_HOUR)));
            releasementEntity.setEndMin(Integer.parseInt(config.get(ReleaseConfig.END_MIN)));
            releasementEntity.setEndHour(Integer.parseInt(config.get(ReleaseConfig.END_HOUR)));
            releasementEntity.setEffectiveTime(DateUtils.generateFrom((config.get(ReleaseConfig.EFFECTIVE_TIME))));
            releasementEntity.setDeadTime(DateUtils.generateFrom(config.get(ReleaseConfig.DEAD_TIME)));
            releasementEntity.setLimitNumber(Integer.parseInt(config.get(ReleaseConfig.LIMIT_NUMBER)));
            releasementEntity.setRepeatAfterNDay(Integer.parseInt(config.get(ReleaseConfig.REPEAT_AFTER_DAY)));

        } catch (Throwable throwable) {
            throwable.printStackTrace();
            throw new UnexpectedReleaseConfig();
        }
        if (releasementEntity.getDeadTime().getTime() <= releasementEntity.getEffectiveTime().getTime()) {
            throw new ReleasementDateException("結課時間大於開課時間");
        }
        if (releasementEntity.getStartHour() > releasementEntity.getEndHour() || (releasementEntity.getStartHour() == releasementEntity.getEndHour() && releasementEntity.getStartMin() > releasementEntity.getEndMin())) {
            throw new ReleasementDateException("上課時間大於下課時間");
        }
        releasementDAO.create(releasementEntity);
    }

    @Override
    public CourseEntity findByCid(Long cid) throws CourseNotExistException {
        CourseEntity found = courseDAO.retrieveByCid(cid);
        if (found == null) throw new CourseNotExistException();
        return found;
    }
}
