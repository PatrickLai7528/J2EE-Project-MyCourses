package com.MyCourses.aspect;/*
 * @PackageName com.MyCourses.aspect
 * @ClassName TokenAspect
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.controller.APIResponse;
import com.MyCourses.utils.JWTTokenUtils;
import com.MyCourses.utils.ResponseUtils;
import org.apache.coyote.Response;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
@Order(10)
public class TokenAspect {

    //    @Pointcut("execution(public * com.MyCourses.controller.StudentController.logIn(com.MyCourses.entity.StudentEntity))")
    @Pointcut("@annotation(com.MyCourses.annotations.GenerateToken)")
    public void generateToken() {
    }

    @Pointcut("@annotation(com.MyCourses.annotations.VerifyToken)")
    public void verifyToken() {

    }

    @Around("verifyToken()")
    public Object doVerifyToken(ProceedingJoinPoint pjp) throws Throwable {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String value = request.getHeader("Authorization");
        boolean isValidToken = JWTTokenUtils.verify(value);
        if (isValidToken) {
            return pjp.proceed(pjp.getArgs());
        } else {
            return ResponseUtils.error("請先登錄");
        }
    }

    @Around("generateToken()")
    public Object doGenerateToken(ProceedingJoinPoint pjp) throws Throwable {
        try {
            Object[] args = pjp.getArgs();
            APIResponse<Object> response = (APIResponse<Object>) pjp.proceed(args);
            if (response.getCode() == 0) {
                // code == 0 means everything is ok
                String token = JWTTokenUtils.sign((String) response.getPayload());
                response.setPayload(token);
            }
            return response;
        } catch (Throwable throwable) {
            throw throwable;
        }
    }
}
