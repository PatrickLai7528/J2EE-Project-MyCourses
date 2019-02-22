package com.j2ee.mycourses.controller;
/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName APIResponse
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

public class APIResponse {
    private boolean success;
    private String message;
    private String description;
    private Object meta;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Object getMeta() {
        return meta;
    }

    public void setMeta(Object meta) {
        this.meta = meta;
    }
}
