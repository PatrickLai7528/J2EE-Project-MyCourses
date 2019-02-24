package com.MyCourses.entity;
/*
 * @PackageName entity
 * @ClassName CommentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "comment_entity")
@Data
public class CommentEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "cmid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cmid;

    @Column(name = "content")
    private String content;


    /**
     * 以下都是回覆誰
     **/
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "teacher_reply")
    private TeacherEntity teacherReply;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "student_reply")
    private StudentEntity studentReply;


    /**
     * 以下都是來自誰
     **/
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "student_message_form")
    private StudentEntity studentMessageFrom;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "teacher_message_form")
    private TeacherEntity teacherMessageFrom;
}
