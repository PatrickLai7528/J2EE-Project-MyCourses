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
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return generate(dateStr, "yyyy-MM-dd");
    }

    private static Date generate(String dateStr, String pattern) throws DateStringFormatException {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        try {
            return format.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new DateStringFormatException();
        }
    }

    private static String toDateString(Date date, String pattern) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        return simpleDateFormat.format(date);
    }

    public static Date generateFromDetail(String dateStr) throws DateStringFormatException {
        return generate(dateStr, "yyyy-MM-dd HH:mm:SS");
    }

    public static String toDetailDateString(Date date) {
        return toDateString(date, "yyyy-MM-dd HH:mm:SS");
    }

    public static String toDateString(Date date) {
        return toDateString(date, "yyyy-MM-dd");
    }
}
