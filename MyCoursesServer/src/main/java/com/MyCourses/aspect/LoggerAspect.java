package com.MyCourses.aspect;/*
 * @PackageName com.MyCourses.aspect
 * @ClassName HttpAspect
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
@Order(5)
public class LoggerAspect {

    private final static Logger logger = LoggerFactory.getLogger(LoggerAspect.class);

    @Pointcut("@annotation(com.MyCourses.annotations.PleaseLog)")
    public void pleaseLog() {

    }

//    @Pointcut("execution(public * com.MyCourses.controller.TeacherController.*(..))")
//    public void teacherLog() {
//
//    }

    private void doLog(JoinPoint joinPoint) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        // url
        logger.info("url={}", request.getRequestURL());

        //method
        logger.info("method={}", request.getMethod());

        //ip
        logger.info("ip={}", request.getRemoteAddr());

        //類方法
        logger.info("class_method={}",
                joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());

        //參數
        Object[] args = joinPoint.getArgs();
        for (Object arg : args)
            if (arg != null)
                logger.info("args={}", arg.toString());
    }

//    @Before("studentLog()")
//    public void doStudentBefore(JoinPoint joinPoint) {
//        doLog(joinPoint);
//    }

    @Before("pleaseLog()")
    public void doTeacherBefore(JoinPoint joinpoint) {
        doLog(joinpoint);
    }

    @AfterReturning(returning = "object", pointcut = "pleaseLog()")
    public void doAfterReturningOfStudent(Object object) {
        logger.info("response={}", object.toString());
    }

//    @AfterReturning(returning = "object", pointcut = "teacherLog()")
//    public void doAfterReturningOfTeacher(Object object) {
//        logger.info("response={}", object.toString());
//    }
}
