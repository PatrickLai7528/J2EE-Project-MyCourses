package com.j2ee.mycourses.dao.impl;

import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.entity.TeacherEntity;
import org.junit.After;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class TeacherDaoTest {

    private ITeacherDao teacherDao = new TeacherDao();

    private static TeacherEntity stub1;
    private static TeacherEntity stub2;

    static {
        stub1 = new TeacherEntity();
        stub2 = new TeacherEntity();

        stub1.setTeacherEmail("teacher1@teacher.com");
        stub1.setName("teacher1");
        stub1.setPassword("123123123");
        stub1.setTeacherNo((long) 1231);

        stub2.setTeacherEmail("teacher2@teacher.com");
        stub2.setName("teacher2");
        stub2.setPassword("123123123");
//        stub2.setTeacherNo("thisisteacherno2");
    }

    @After
    public void tearDown() throws Exception {
        teacherDao.physicalDelete(stub1);
        teacherDao.physicalDelete(stub2);
    }

    @Test
    public void retrieveByEmail() {
        teacherDao.create(stub1);
        teacherDao.create(stub2);

        TeacherEntity found1 = teacherDao.retrieveByEmail(stub1.getTeacherEmail());
        TeacherEntity found2 = teacherDao.retrieveByEmail(stub2.getTeacherEmail());

        assertEquals(found1, stub1);
        assertEquals(found2, stub2);
    }

    @Test
    public void create() {
        teacherDao.create(stub1);
        teacherDao.create(stub2);
    }

    @Test
    public void retrieveAll() {
        teacherDao.create(stub1);
        teacherDao.create(stub2);

        List<TeacherEntity> list = teacherDao.retrieveAll();

        boolean has1 = false;
        boolean has2 = false;

        for(TeacherEntity teacherEntity : list){
            if(teacherEntity.getTeacherEmail().equals(stub1.getTeacherEmail()))
                has1 = true;
            else if(teacherEntity.getTeacherEmail().equals(stub2.getTeacherEmail()))
                has2 = true;
        }

        assertTrue(has1);
        assertTrue(has2);
        assertEquals(2, list.size());
    }

    @Test
    public void update() {
        teacherDao.create(stub1);
        teacherDao.create(stub2);

        stub1.setName("new name");
        stub2.setTeacherNo((long) 1231);

        teacherDao.update(stub1);
        teacherDao.update(stub2);

        TeacherEntity teacherEntity = teacherDao.retrieveByEmail(stub1.getTeacherEmail());
        assertEquals(teacherEntity.getName(), stub1.getName());

        TeacherEntity teacherEntity1 = teacherDao.retrieveByEmail(stub2.getTeacherEmail());
        assertEquals(teacherEntity1.getTeacherNo(), stub2.getTeacherNo());

    }
}
