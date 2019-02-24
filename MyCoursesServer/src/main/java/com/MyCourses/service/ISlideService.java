package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName ISlideService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.ReleasementNotExistException;

public interface ISlideService {
    void addSlide(String title, String filePath, Long rid) throws ReleasementNotExistException;
}
