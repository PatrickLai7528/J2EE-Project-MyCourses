package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName FileSize
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.converter.ByteUnitConverter;
import com.MyCourses.entity.enums.ByteUnit;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;

@Embeddable
@Data
public class FileSize {

    @Column(name = "file_size")
    private int size;

    @Column(name = "file_unit")
    @Convert(converter = ByteUnitConverter.class)
    private ByteUnit unit;
}
