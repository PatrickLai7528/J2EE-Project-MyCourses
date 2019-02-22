package com.j2ee.mycourses.service.impl;/*
 * @PackageName com.j2ee.mycourses
 * @ClassName EncryptServiceTest
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.service.IEncryptService;
import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class EncryptServiceTest {
    private IEncryptService encryptService = new EncryptService();
    @Test
    public void testEncrypt() {
        String password1 = "password1";
        String password2 = "password1";

        String s1_1 = encryptService.encrypt(password1);
        String s1_2 = encryptService.encrypt(password1);

        String s2_1 = encryptService.encrypt(password2);
        String s2_2 = encryptService.encrypt(password2);

        assertEquals(s1_1, s1_2);
        assertEquals(s2_1, s2_2);

    }
}
