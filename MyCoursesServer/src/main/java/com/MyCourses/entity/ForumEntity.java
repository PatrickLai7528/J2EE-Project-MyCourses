package com.MyCourses.entity;

/*
 * @PackageName entity
 * @ClassName ForumEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-3
 * @ProjectName server
 */

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "forum_entity")
@Data
public class ForumEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fid")
    private Long fid;

    @Column(name = "topic")
    private String topic;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cmid")
    private List<CommentEntity> commentEntityList;

}
