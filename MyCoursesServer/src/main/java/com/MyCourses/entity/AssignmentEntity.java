package com.MyCourses.entity;
/*
 * @PackageName entity
 * @ClassName AssignmentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "assignment_entity")
@Data
public class AssignmentEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "assid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long assid;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "sid")
    private SlideEntity slideEntity;
}
