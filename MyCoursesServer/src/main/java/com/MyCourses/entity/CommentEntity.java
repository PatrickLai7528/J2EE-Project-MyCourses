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

    @Column(name = "reply_to")
    private String replyTo;

    @Column(name = "message_from")
    private String messageFrom;
}
