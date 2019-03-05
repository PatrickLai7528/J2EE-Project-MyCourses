package com.MyCourses.entity.converter;/*
 * @PackageName com.MyCourses.entity.converter
 * @ClassName DateConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */


import com.MyCourses.exceptions.DateStringFormatException;
import com.MyCourses.utils.DateUtils;

import javax.persistence.AttributeConverter;
import java.util.Date;

public class DateConverter implements AttributeConverter<Date, String> {
    @Override
    public String convertToDatabaseColumn(Date date) {
        if (date == null) return null;
        return DateUtils.toDateString(date);
    }

    @Override
    public Date convertToEntityAttribute(String s) {
        try {
            return DateUtils.generateFrom(s);
        } catch (DateStringFormatException e) {
            e.printStackTrace();
            return null;
        }
    }
}
