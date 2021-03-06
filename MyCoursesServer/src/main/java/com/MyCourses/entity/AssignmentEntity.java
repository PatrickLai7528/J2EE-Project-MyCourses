package com.MyCourses.entity;
/*
 * @PackageName entity
 * @ClassName AssignmentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.MyCourses.entity.converter.DateConverter;
import com.MyCourses.entity.converter.DetailDateConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

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

    @Column(name = "add_time")
    @Convert(converter = DetailDateConverter.class)
    private Date addTime;

    @Embedded
    private FileSize fileSize;

    @Column(name = "ddl")
    @Convert(converter = DateConverter.class)
    private Date ddl;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapKey(name = "smid")
    private List<SubmissionEntity> submissionEntityList;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "sid")
    private SlideEntity slideEntity;
}
