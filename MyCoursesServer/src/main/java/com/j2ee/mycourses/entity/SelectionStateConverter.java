package com.j2ee.mycourses.entity;/*
 * @PackageName com.j2ee.mycourses.entity
 * @ClassName SelectionStateConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class SelectionStateConverter implements AttributeConverter<SelectionState, String> {
    @Override
    public String convertToDatabaseColumn(SelectionState selectionState) {
        return selectionState.getValue();
    }

    @Override
    public SelectionState convertToEntityAttribute(String s) {
        return SelectionState.fromString(s);
    }
}
