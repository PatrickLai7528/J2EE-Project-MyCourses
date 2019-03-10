package com.MyCourses.service.schedule;/*
 * @PackageName com.MyCourses.service.schedule
 * @ClassName ReleasementCheck
 * @Author Lai Kin Meng
 * @Date 2019-03-09
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.dao.ISelectionDAO;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.SelectionEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.entity.enums.SelectionState;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.ISelectionService;
import com.MyCourses.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ReleasementCheck {

    private final IReleasementService releasementService;
    private final IReleasementDAO releasementDAO;
    private final ITeacherService teacherService;
    private final ISelectionService selectionService;
    private final ISelectionDAO selectionDAO;

    @Autowired
    public ReleasementCheck(IReleasementService releasementService, IReleasementDAO releasementDAO, ITeacherService teacherService, ISelectionService selectionService, ISelectionDAO selectionDAO) {
        this.releasementService = releasementService;
        this.releasementDAO = releasementDAO;
        this.teacherService = teacherService;
        this.selectionService = selectionService;
        this.selectionDAO = selectionDAO;
    }

    @Scheduled(cron = "0 0 12 * * *")
//    @Scheduled(fixedRate = 50000)
    public void checkReleasement() throws TeacherNotExistException {
        List<TeacherEntity> teacherEntityList = teacherService.getAllTeachers();
        for (TeacherEntity teacherEntity : teacherEntityList) {
            List<ReleasementEntity> releasementEntityList =
                    this.releasementService.getReleasementOf(teacherEntity.getTeacherEmail());

            long now = new Date().getTime();

            for (ReleasementEntity releasementEntity : releasementEntityList) {
                if (releasementEntity.getEffectiveTime().getTime() > now) {
                    // this release is effective
                    List<SelectionEntity> selectionEntityList =
                            selectionService.getActiveSelectionOfReleasement(releasementEntity.getRid());

                    if (selectionEntityList.size() > releasementEntity.getLimitNumber()) {
                        // it is over selected
                        for (int i = 0; i < selectionEntityList.size(); i++) {
                            if (i < releasementEntity.getLimitNumber()) {
                                selectionEntityList.get(i).setSelectionState(SelectionState.SELECTED);
                            } else {
                                selectionEntityList.get(i).setSelectionState(SelectionState.MISS);
                            }
                            selectionDAO.update(selectionEntityList.get(i));
                        }
                    }
                }
            }



        }
    }
}
