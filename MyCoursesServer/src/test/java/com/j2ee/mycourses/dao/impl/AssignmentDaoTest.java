package com.j2ee.mycourses.dao.impl;

import com.j2ee.mycourses.dao.IAssignmentDao;
import com.j2ee.mycourses.entity.AssignmentEntity;
import com.j2ee.mycourses.entity.SlideEntity;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class AssignmentDaoTest {

    private IAssignmentDao assignmentDao = new AssignmentDao();

    private static AssignmentEntity stub1;
    private static AssignmentEntity stub2;

    private static SlideEntity slideEntity1;
    private static SlideEntity slideEntity2;

    static {
        slideEntity1 = new SlideEntity();
//        slideEntity1.setSid(101);
        slideEntity1.setTitle("123123");
        slideEntity1.setFilePath("no path hahahaha");

        slideEntity2 = new SlideEntity();
//        slideEntity2.setSid(102);
        slideEntity2.setTitle("jlk;");
        slideEntity2.setFilePath("hkjl;asdf");

        stub1 = new AssignmentEntity();
        stub2 = new AssignmentEntity();

        stub1.setAssId(9);
        stub1.setTitle("new titile");
        stub1.setDescription("desc 1");
        stub1.setSlideEntity(slideEntity1);

        stub2.setAssId(10);
        stub2.setTitle("hkjl;hkijkhjlk");
        stub2.setDescription("good morning");
        stub2.setSlideEntity(slideEntity2);
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
        assignmentDao.physicalDelete(stub1);
        assignmentDao.physicalDelete(stub2);
    }

    @Test
    public void create() {
        assignmentDao.create(stub1);
        assignmentDao.create(stub2);

        AssignmentEntity found1 = assignmentDao.retrieveByAssId(stub1.getAssId());
        assertEquals(found1, stub1);
        assertEquals(found1.getSlideEntity(), stub1.getSlideEntity());

        AssignmentEntity found2 = assignmentDao.retrieveByAssId(stub2.getAssId());
        assertEquals(found2, stub2);
        assertEquals(found2.getSlideEntity(), stub2.getSlideEntity());
    }

    @Test
    public void retrieveAll() {
        assignmentDao.create(stub1);
        assignmentDao.create(stub2);

        List<AssignmentEntity> list = assignmentDao.retrieveAll();

        boolean has1 = false;
        boolean has2 = false;

        for (AssignmentEntity assignmentEntity : list) {
            if (assignmentEntity.getAssId() == stub1.getAssId())
                has1 = true;
            else if (assignmentEntity.getAssId() == stub2.getAssId())
                has2 = true;
        }

        assertTrue(has1);
        assertTrue(has2);
        Assert.assertEquals(2, list.size());
    }

    @Test
    public void update() {
        assignmentDao.create(stub1);
        assignmentDao.create(stub2);

        stub1.setDescription("super patrick is handsome");
        stub1.setTitle("i am super patrick");

        assignmentDao.update(stub1);

        AssignmentEntity found1 = assignmentDao.retrieveByAssId(stub1.getAssId());
        assertEquals(found1.getDescription(), stub1.getDescription());
        assertEquals(found1.getTitle(), stub1.getTitle());
    }


}
