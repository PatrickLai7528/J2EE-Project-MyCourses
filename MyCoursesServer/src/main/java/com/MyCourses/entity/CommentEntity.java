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
import java.util.List;
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


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapKey(name = "below_comment_id")
    private List<CommentEntity> belowCommentList;


    /**
     * 以下都是來自誰
     **/
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "message_form_student")
    private StudentEntity messageFromStudent;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "teacher_message_form")
    private TeacherEntity messageFromTeacher;
}
