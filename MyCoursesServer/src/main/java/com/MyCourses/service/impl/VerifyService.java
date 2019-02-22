package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName VerifyService
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.aspect.LoggerAspect;
import com.MyCourses.exceptions.MailSendingException;
import com.MyCourses.exceptions.VerificationException;
import com.MyCourses.exceptions.VerifyMailSendingException;
import com.MyCourses.service.IEncryptService;
import com.MyCourses.service.IMailService;
import com.MyCourses.service.IVerifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class VerifyService implements IVerifyService {
    private final static Logger logger = LoggerFactory.getLogger(VerifyService.class);

    /**
     * key: the hash value of studentEntity or teacherEntity email who are requiring verify mail
     * value: the verify code of specific studentEntity or teacherEntity
     */
    private static Map<String, String> verifyCodeMap = new HashMap<>();

    private final IMailService mailService;
    private final IEncryptService encryptService;

    @Autowired
    public VerifyService(IMailService mailService, IEncryptService encryptService) {
        this.mailService = mailService;
        this.encryptService = encryptService;
    }


    @Override
    public boolean verify(String email, String actualCode) throws VerificationException {
        String hashValue = encryptService.encrypt(email);
        String expectedCode = verifyCodeMap.get(hashValue);
        if (expectedCode == null)
            throw new VerificationException("沒有發送驗證郵件至" + email);

        boolean isValid = actualCode.equals(expectedCode);
        if (isValid) {
            logger.info("Code {} of {} is consumed", actualCode, email);
            verifyCodeMap.remove(hashValue);
        }
        return isValid;
    }

    @Override
    public void sendRegistryVerifyMail(String email) throws VerifyMailSendingException {
        try {
            String code = getRandomVerifyCode(email);
            mailService.sendSimpleMail(email, "來自MyCourses的驗證碼", "驗證碼為" + code);
            verifyCodeMap.put(encryptService.encrypt(email), code);
            logger.info("Sent verify code to={}", email);
            logger.info("code={}", code);
        } catch (MailSendingException e) {
            e.printStackTrace();
            throw new VerifyMailSendingException();
        }

    }

    private String getRandomVerifyCode(String email) {
        String longCode = encryptService.encrypt(email);
        if (longCode.length() > 6)
            return longCode.substring(0, 6);
        return longCode;
    }
}
