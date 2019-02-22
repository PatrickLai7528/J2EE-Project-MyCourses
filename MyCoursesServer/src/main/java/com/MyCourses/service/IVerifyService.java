package com.MyCourses.service;
/*
 * @PackageName com.MyCourses.service
 * @ClassName IVerifyService
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.StudentEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.VerificationException;
import com.MyCourses.exceptions.VerifyMailSendingException;

public interface IVerifyService {

//    void sendRegistryVerifyMail(StudentEntity studentEntity) throws VerifyMailSendingException;

    void sendRegistryVerifyMail(String email) throws VerifyMailSendingException;

//    boolean verify(StudentEntity studentEntity, String code) throws VerificationException;

    boolean verify(String email, String code) throws VerificationException;
}
