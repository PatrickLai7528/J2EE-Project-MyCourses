package com.MyCourses.entity.enums;
/*
 * @PackageName com.MyCourses.entity.enums
 * @ClassName ByteUnitConverter
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

import java.util.Objects;

public enum ByteUnit {
    KB("KB"), MB("MB"), GB("GB");

    private String value;

    ByteUnit(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static ByteUnit fromString(String value) {
        Objects.requireNonNull(value, "value can not be null");
        ByteUnit byteUnit = null;
        switch (value) {
            case "KB":
                byteUnit = KB;
                break;
            case "MB":
                byteUnit = MB;
                break;
            case "GB":
                byteUnit = GB;
                break;
        }
        return byteUnit;
    }
}
