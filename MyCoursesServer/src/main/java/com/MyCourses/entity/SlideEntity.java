package com.MyCourses.entity;

/*
 * @PackageName entity
 * @ClassName SlideEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.MyCourses.entity.converter.DetailDateConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "slide_entity")
@Data
public class SlideEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "sid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sid;

    @Column(name = "title")
    private String title;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "upload_time")
    @Convert(converter = DetailDateConverter.class)
    private Date uploadTime;

//    private CourseEntity courseEntity;
////
//    public SlideEntity() {
//    }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "sid")
//    public long getSid() {
//        return sid;
//    }
//
//    public void setSid(long sid) {
//        this.sid = sid;
//    }
//
//    @Basic
//    @Column(name = "title")
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    @Basic
//    @Column(name = "file_path")
//    public String getFilePath() {
//        return filePath;
//    }
//
//    public void setFilePath(String filePath) {
//        this.filePath = filePath;
//    }
//
////    @Column(name = "course_id")
////    public CourseEntity getCourseEntity() {
////        return courseEntity;
////    }
////
////    public void setCourseEntity(CourseEntity courseEntity) {
////        this.courseEntity = courseEntity;
////    }
//
//    @Override
//    public String toString() {
//        return "SlideEntity{" +
//                "sid=" + sid +
//                ", title='" + title + '\'' +
//                ", filePath='" + filePath + '\'' +
//                '}';
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof SlideEntity)) return false;
//        SlideEntity that = (SlideEntity) o;
//        return getSid() == that.getSid() &&
//                Objects.equals(getTitle(), that.getTitle()) &&
//                Objects.equals(getFilePath(), that.getFilePath());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(getSid(), getTitle(), getFilePath());
//    }
}
