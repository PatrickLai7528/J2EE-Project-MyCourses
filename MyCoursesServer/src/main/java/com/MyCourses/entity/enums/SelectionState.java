package com.MyCourses.entity.enums;
/*
 * @PackageName com.j2ee.mycourses.entity
 * @ClassName SelectionState
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import java.util.Objects;

public enum SelectionState {

    ADDED("ADDED"),

    OVER("OVER"),

    DROPPED("DROPPED"),

    MISS("MISS"),

    BY_SELECTED("BY_SELECTED"),

    SELECTED("SELECTED");

    private String value;

    SelectionState(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static SelectionState fromString(String value) {
        Objects.requireNonNull(value, "value can not be null");
        SelectionState selectionState = null;
        switch (value) {
            case "ADDED":
                selectionState = ADDED;
                break;
            case "OVER":
                selectionState = OVER;
                break;
            case "DROPPED":
                selectionState = DROPPED;
                break;
            case "MISS":
                selectionState = MISS;
                break;
            case "BY_SELECTED":
                selectionState = BY_SELECTED;
                break;
            case "SELECTED":
                selectionState = SELECTED;
        }
        return selectionState;
    }
}
