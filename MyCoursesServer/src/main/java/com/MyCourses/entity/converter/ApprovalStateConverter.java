package com.MyCourses.entity.converter;/*
 * @PackageName com.MyCourses.entity.converter
 * @ClassName ApprovalStateConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.enums.ApprovalState;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ApprovalStateConverter implements AttributeConverter<ApprovalState, String> {
    @Override
    public String convertToDatabaseColumn(ApprovalState approvalState) {
        return approvalState.getValue();
    }

    @Override
    public ApprovalState convertToEntityAttribute(String s) {
        return ApprovalState.fromString(s);
    }
}
