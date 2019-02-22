package com.MyCourses.entity.enums;/*
 * @PackageName com.MyCourses.entity
 * @ClassName ApprovalState
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import java.util.Objects;

public enum ApprovalState {
    REJECTED("REJECTED"),
    WAITING("WAITING"),
    APPROVED("APPROVED");

    private String value;

    ApprovalState(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static ApprovalState fromString(String value) {
        Objects.requireNonNull(value, "value can not be null");
        ApprovalState state;
        switch (value) {
            case "REJECTED":
                state = REJECTED;
                break;
            case "WAITING":
                state = WAITING;
                break;
            case "APPROVED":
                state = APPROVED;
                break;
            default:
                throw new IllegalArgumentException("未預期的狀態");
        }
        return state;
    }
}
