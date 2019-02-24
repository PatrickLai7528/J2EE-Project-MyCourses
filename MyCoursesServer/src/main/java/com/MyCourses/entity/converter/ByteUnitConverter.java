package com.MyCourses.entity.converter;/*
 * @PackageName com.MyCourses.entity.converter
 * @ClassName ByteUnitConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.entity.enums.ByteUnit;

import javax.persistence.AttributeConverter;

public class ByteUnitConverter implements AttributeConverter<ByteUnit, String> {
    @Override
    public String convertToDatabaseColumn(ByteUnit byteUnit) {
        return byteUnit.getValue();
    }

    @Override
    public ByteUnit convertToEntityAttribute(String s) {
        return ByteUnit.fromString(s);
    }
}
