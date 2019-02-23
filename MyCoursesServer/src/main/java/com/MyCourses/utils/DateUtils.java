package com.MyCourses.utils;/*
 * @PackageName com.MyCourses.utils
 * @ClassName DateUtils
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.exceptions.DateStringFormatException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
    public static Date generateFrom(String dateStr) throws DateStringFormatException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return format.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new DateStringFormatException();
        }
    }
}
