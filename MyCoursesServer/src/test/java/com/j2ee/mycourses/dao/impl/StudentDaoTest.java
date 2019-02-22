package com.j2ee.mycourses.dao.impl;


import com.j2ee.mycourses.entity.StudentEntity;
import org.junit.After;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class StudentDaoTest {
    private StudentDao studentDao = new StudentDao();
    private static StudentEntity stub1 = new StudentEntity();
    private static StudentEntity stub2 = new StudentEntity();

    static {
        stub1.setEmail("161250051@smail.nju.edu.cn");
        stub1.setPassword("161250051");
        stub1.setName("賴健明");
        stub1.setStudentNo("161250051");

        stub2.setEmail("123123123@smail.nju.edu.cn");
        stub2.setPassword("161250055");
        stub2.setName("賴大明");
        stub2.setStudentNo("161250055");
    }

    @Test
    public void create() {
        studentDao.create(stub1);
        studentDao.create(stub2);
    }

    @Test
    public void retrieveAll() {
        studentDao.create(stub1);
        studentDao.create(stub2);
        boolean hasStub1 = false;
        boolean hasStub2 = false;
        List<StudentEntity> list = studentDao.retrieveAll();
        for (StudentEntity studentEntity : list) {
            if (studentEntity.getEmail().equals(stub1.getEmail()))
                hasStub1 = true;
            else if (studentEntity.getEmail().equals(stub2.getEmail()))
                hasStub2 = true;
        }
        assertTrue(hasStub1);
        assertTrue(hasStub2);
        assertEquals(2, list.size());

    }

    @Test
    public void retrieveByEmail() {
        studentDao.create(stub1);
        studentDao.create(stub2);
        StudentEntity studentEntity1 = studentDao.retrieveByEmail(stub1.getEmail());
        StudentEntity studentEntity2 = studentDao.retrieveByEmail(stub2.getEmail());
        assertEquals(stub1, studentEntity1);
        assertEquals(stub2, studentEntity2);
    }

    @Test
    public void retrieveByStudentNo() {
        studentDao.create(stub1);
        studentDao.create(stub2);
        StudentEntity studentEntity1 = studentDao.retrieveByStudentNo(stub1.getStudentNo());
        StudentEntity studentEntity2 = studentDao.retrieveByStudentNo(stub2.getStudentNo());
        assertEquals(stub1, studentEntity1);
        assertEquals(stub2, studentEntity2);
    }

    @Test
    public void update() {
        studentDao.create(stub1);
        studentDao.create(stub2);
        stub1.setStudentNo("123123123");
        stub2.setPassword("goodmorning");
        studentDao.update(stub1);
        studentDao.update(stub2);

        StudentEntity found1 = studentDao.retrieveByEmail(stub1.getEmail());
        StudentEntity found2 = studentDao.retrieveByStudentNo(stub2.getStudentNo());

        assertEquals(found1, stub1);
        assertEquals(found2, stub2);
    }


    @Test
    public void logicalDelete() {
        studentDao.create(stub1);
        studentDao.create(stub2);
        studentDao.logicalDelete(stub1);
        studentDao.logicalDelete(stub2);
        StudentEntity found1 = studentDao.retrieveByEmail(stub1.getEmail());
        StudentEntity found2 = studentDao.retrieveByStudentNo(stub2.getStudentNo());
        assertTrue(stub1.getDeleted());
        assertTrue(stub2.getDeleted());
        assertEquals(found1, stub1);
        assertEquals(found2, stub2);
    }

//    @Test
//    public void physicalDelete() {
//        studentDao.physicalDelete(stub1);
//    }

    @After
    public void clear() {
        studentDao.physicalDelete(stub1);
        studentDao.physicalDelete(stub2);
    }
}
