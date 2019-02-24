package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service
 * @ClassName AssignmentService
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IReleasementDAO;
import com.MyCourses.entity.AssignmentEntity;
import com.MyCourses.entity.FileSize;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.entity.enums.ByteUnit;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AssignmentService implements IAssignmentService {

    private final IReleasementDAO releasementDAO;

    @Autowired
    public AssignmentService(IReleasementDAO releasementDAO) {
        this.releasementDAO = releasementDAO;
    }

    @Override
    public void addAssignment(Long rid, String title, String description, Date ddl, int size, ByteUnit byteUnit) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);

        if (releasementEntity == null) throw new ReleasementNotExistException();

        AssignmentEntity assignmentEntity = new AssignmentEntity();

        FileSize fileSize = new FileSize();

        fileSize.setSize(size);
        fileSize.setUnit(byteUnit);

        assignmentEntity.setDescription(description);
        assignmentEntity.setTitle(title);
        assignmentEntity.setDdl(ddl);
        assignmentEntity.setFileSize(fileSize);

        List<AssignmentEntity> fromReleasement = releasementEntity.getAssignmentEntityList();
        if (fromReleasement == null)
            fromReleasement = new ArrayList<>();

        fromReleasement.add(assignmentEntity);

        releasementDAO.update(releasementEntity);
    }
}
