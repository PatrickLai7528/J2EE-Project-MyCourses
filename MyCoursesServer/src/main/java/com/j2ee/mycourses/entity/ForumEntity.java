package com.j2ee.mycourses.entity;

/*
 * @PackageName entity
 * @ClassName ForumEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-3
 * @ProjectName server
 */

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "forum_entity")
public class ForumEntity {
    private long fid;
    private String topic;
    private List<CommentEntity> commentEntityList;

    //    private CourseEntity courseEntity;
    public ForumEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fid")
    public long getFid() {
        return fid;
    }

    public void setFid(long fid) {
        this.fid = fid;
    }

    @Column(name = "topic", unique = true)
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    @OneToMany
    public List<CommentEntity> getCommentEntityList() {
        return commentEntityList;
    }

    public void setCommentEntityList(List<CommentEntity> commentEntityList) {
        this.commentEntityList = commentEntityList;
    }

    @Override
    public String toString() {
        return "ForumEntity{" +
                "fid=" + fid +
                ", topic='" + topic + '\'' +
                ", commentEntityList=" + commentEntityList +
                '}';
    }

//    @JoinColumn(name = "course_id")
//    public CourseEntity getCourseEntity() {
//        return courseEntity;
//    }
//
//    public void setCourseEntity(CourseEntity courseEntity) {
//        this.courseEntity = courseEntity;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ForumEntity)) return false;
        ForumEntity that = (ForumEntity) o;
        return getFid() == that.getFid() &&
                getTopic().equals(that.getTopic()) &&
                getCommentEntityList().equals(that.getCommentEntityList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFid(), getTopic(), getCommentEntityList());
    }
}
