package com.MyCourses.service.impl;

import com.MyCourses.service.IMailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
public class MailServiceTest {

    @Autowired
    private IMailService MailService;

    @Test
    public void testSimpleMail() throws Exception {
        MailService.sendSimpleMail("mycourses_51@163.com", "test simple mail", " hello this is simple mail");
    }
}
