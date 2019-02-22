package com.MyCourses.utils;/*
 * @PackageName com.MyCourses.utils
 * @ClassName ResponseUtils
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.controller.APIResponse;

public class ResponseUtils {

    public static<T> APIResponse<T> ok(String message, T payload) {
        APIResponse<T> apiResponse = new APIResponse<>();
        apiResponse.setCode(0);
        apiResponse.setMessage(message);
        apiResponse.setPayload(payload);
        return apiResponse;
    }

    public static APIResponse<Object> ok(String message) {
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(0);
        apiResponse.setMessage(message);
        return apiResponse;
    }

    public static<T> APIResponse notOk(String message, T payload) {
        APIResponse<T> apiResponse = new APIResponse<>();
        apiResponse.setCode(1);
        apiResponse.setMessage(message);
        apiResponse.setPayload(payload);
        return apiResponse;
    }

    public static APIResponse<Object> notOk(String message) {
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(1);
        apiResponse.setMessage(message);
        return apiResponse;
    }

    public static APIResponse<Object> error(String message) {
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(99);
        apiResponse.setMessage(message);
        return apiResponse;
    }

    public static<T> APIResponse error(String message, T payload) {
        APIResponse<T> apiResponse = new APIResponse<>();
        apiResponse.setCode(99);
        apiResponse.setMessage(message);
        apiResponse.setPayload(payload);
        return apiResponse;
    }
}
