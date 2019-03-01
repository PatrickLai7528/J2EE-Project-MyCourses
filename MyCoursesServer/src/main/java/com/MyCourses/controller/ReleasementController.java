package com.MyCourses.controller;
/*
 * @PackageName com.MyCourses.controller
 * @ClassName ReleasementController
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.CourseNotExistException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.UnexpectedReleaseConfig;
import com.MyCourses.service.ICourseService;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.service.ReleaseConfig;
import com.MyCourses.utils.ResponseUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("releasement")
public class ReleasementController {
    private final static Logger logger = LoggerFactory.getLogger(ReleasementController.class);

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
    public APIResponse<List<ReleasementEntity>> release(
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
            CourseEntity courseEntity = courseService.findByCid(cid);
            List<ReleasementEntity> releasementEntityList =
                    releasementService.getReleasementOf(courseEntity.getTeacherEntity().getTeacherEmail());

            return ResponseUtils.ok("課程發佈成功", releasementEntityList);
        } catch (UnexpectedReleaseConfig | CourseNotExistException | TeacherNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(),null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("available")
    @PleaseLog
    public APIResponse<List<ReleasementEntity>> getAllAvailableRelease() {
        List<ReleasementEntity> available = releasementService.getAvailable();
        return ResponseUtils.ok("操作成功", available);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("all")
    @PleaseLog
    public APIResponse<List<ReleasementEntity>> getAll() {
        List<ReleasementEntity> all = releasementService.getAll();
        return ResponseUtils.ok("操作成功", all);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("of")
    @PleaseLog
    public APIResponse<List<ReleasementEntity>> getReleasementOf(
            @RequestParam(name = "teacherEmail") String teacherEmail) {
        try {
            List<ReleasementEntity> releasementEntityList = releasementService.getReleasementOf(teacherEmail);

            return ResponseUtils.ok("操作成功", releasementEntityList);
        } catch (TeacherNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @GetMapping("rid/{rid}")
    @PleaseLog
    @CrossOrigin("http://localhost:3000")
    public APIResponse<ReleasementEntity> getReleasementByRid(@PathVariable(name = "rid") Long rid) {
        try {
            logger.warn("開始處理按ID取Releasement的請求");
            ReleasementEntity releasementEntity = releasementService.getReleasementByRid(rid);
            logger.warn("結束處理按ID取Releasement的請求");
            return ResponseUtils.ok("操作成功", releasementEntity);
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error("操作失敗", null);
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
