package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName AssignmentService
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.AssignmentEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.ReleasementNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentService implements IAssignmentService {

    private final IReleasementDAO releasementDAO;

    @Autowired
    public AssignmentService(IReleasementDAO releasementDAO) {
        this.releasementDAO = releasementDAO;
    }

    @Override
    public void addAssignment(Long rid, String title, String description) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        if (releasementEntity == null) throw new ReleasementNotExistException();

        AssignmentEntity assignmentEntity = new AssignmentEntity();
        assignmentEntity.setDescription(description);
        assignmentEntity.setTitle(title);

        List<AssignmentEntity> fromReleasement = releasementEntity.getAssignmentEntityList();
        if (fromReleasement == null)
            fromReleasement = new ArrayList<>();

        fromReleasement.add(assignmentEntity);

        releasementDAO.update(releasementEntity);
    }
}
