package com.MyCourses.entity.converter;/*
 * @PackageName com.MyCourses.entity.converter
 * @ClassName DetailDateConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-26
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.DateStringFormatException;
import com.MyCourses.utils.DateUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Date;

@Converter
public class DetailDateConverter implements AttributeConverter<Date, String> {
    @Override
    public String convertToDatabaseColumn(Date date) {
        if (date == null) return null;
        return DateUtils.toDetailDateString(date);
    }

    @Override
    public Date convertToEntityAttribute(String s) {
        try {
            if (s == null) return null;
            return DateUtils.generateFromDetail(s);
        } catch (DateStringFormatException e) {
            e.printStackTrace();
            return null;
        }
    }
}
