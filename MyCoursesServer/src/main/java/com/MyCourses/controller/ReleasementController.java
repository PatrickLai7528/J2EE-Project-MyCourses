package com.MyCourses.controller;
/*
 * @PackageName com.MyCourses.controller
 * @ClassName ReleasementController
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.CourseNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.UnexpectedReleaseConfig;
import com.MyCourses.service.ICourseService;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.ReleaseConfig;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("releasement")
public class ReleasementController {

    private ICourseService courseService;
    private IReleasementService releasementService;

    @Autowired
    public ReleasementController(ICourseService courseService, IReleasementService releasementService) {
        this.courseService = courseService;
        this.releasementService = releasementService;
    }

    @PleaseLog
//    @VerifyToken
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("add")
    public ResponseEntity<APIResponse<Object>> release(
            @RequestParam(name = "cid") Long cid,
            @RequestParam(name = "effectiveTime") String effectiveTime,
            @RequestParam(name = "deadTime") String deadTime,
            @RequestParam(name = "startHour") String startHour,
            @RequestParam(name = "startMin") String startMin,
            @RequestParam(name = "endHour") String endHour,
            @RequestParam(name = "endMin") String endMin,
            @RequestParam(name = "repeat") String repeatAfterDay,
            @RequestParam(name = "limitNumber") String limitNumber
    ) {
        try {
            Map<String, String> map = new HashMap<>();
            map.put(ReleaseConfig.REPEAT_AFTER_DAY, repeatAfterDay);
            map.put(ReleaseConfig.LIMIT_NUMBER, limitNumber);
            map.put(ReleaseConfig.DEAD_TIME, deadTime);
            map.put(ReleaseConfig.EFFECTIVE_TIME, effectiveTime);
            map.put(ReleaseConfig.START_HOUR, startHour);
            map.put(ReleaseConfig.START_MIN, startMin);
            map.put(ReleaseConfig.END_HOUR, endHour);
            map.put(ReleaseConfig.END_MIN, endMin);

            courseService.release(cid, map);
            return new ResponseEntity<>(
                    ResponseUtils.ok("課程發佈成功"),
                    HttpStatus.OK
            );
        } catch (UnexpectedReleaseConfig | CourseNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("available")
    @PleaseLog
    public ResponseEntity<APIResponse<List<ReleasementEntity>>> getAllAvailableRelease() {
        List<ReleasementEntity> available = releasementService.getAvailable();
        return new ResponseEntity<>(ResponseUtils.ok("操作成功", available), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("all")
    @PleaseLog
    public ResponseEntity<APIResponse<List<ReleasementEntity>>> getAll() {
        List<ReleasementEntity> all = releasementService.getAll();
        return new ResponseEntity<>(ResponseUtils.ok("操作成功", all), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("of")
    @PleaseLog
    public ResponseEntity<APIResponse<List<ReleasementEntity>>> getReleasementOf(
            @RequestParam(name = "teacherEmail") String teacherEmail) {
        try {
            List<ReleasementEntity> releasementEntityList = releasementService.getReleasementOf(teacherEmail);
            return new ResponseEntity<>(
                    ResponseUtils.ok("操作成功", releasementEntityList),
                    HttpStatus.OK
            );
        } catch (TeacherNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity(
                    ResponseUtils.error(e.getLocalizedMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

    }

//    private Map<String, String> getReleaseConfig(MultiValueMap<String, String> formData) throws UnexpectedReleaseConfig {
//        Map<String, String> map = new HashMap<>();
//        try {
//            map.put(ReleaseConfig.REPEAT_AFTER_DAY, formData.getFirst(ReleaseConfig.REPEAT_AFTER_DAY));
//            map.put(ReleaseConfig.LIMIT_NUMBER, formData.getFirst(ReleaseConfig.LIMIT_NUMBER));
//            map.put(ReleaseConfig.DEAD_TIME, formData.getFirst(ReleaseConfig.DEAD_TIME));
//            map.put(ReleaseConfig.EFFECTIVE_TIME, formData.getFirst(ReleaseConfig.EFFECTIVE_TIME));
//            map.put(ReleaseConfig.START_HOUR, formData.getFirst(ReleaseConfig.START_HOUR));
//            map.put(ReleaseConfig.START_MIN, formData.getFirst(ReleaseConfig.START_MIN));
//            map.put(ReleaseConfig.END_HOUR, formData.getFirst(ReleaseConfig.END_HOUR));
//            map.put(ReleaseConfig.END_MIN, formData.getFirst(ReleaseConfig.END_MIN));
//            return map;
//        } catch (Throwable throwable) {
//            throwable.printStackTrace();
//            throw new UnexpectedReleaseConfig();
//        }
//    }
}