package com.MyCourses.entity;

/*
 * @PackageName entity
 * @ClassName CourseEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.MyCourses.entity.converter.ApprovalStateConverter;
import com.MyCourses.entity.converter.DetailDateConverter;
import com.MyCourses.entity.enums.ApprovalState;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "course_entity")
@Data
public class CourseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "cid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;

    @Column(name = "released")
    private Boolean isReleased;

    @Column(name = "add_time")
    @Convert(converter = DetailDateConverter.class)
    private Date addTime;

    @Column(name = "name")
    private String name;

    @Column(name = "approval_state")
    @Convert(converter = ApprovalStateConverter.class)
    private ApprovalState approvalState;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_email")
    private TeacherEntity teacherEntity;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "rcid", referencedColumnName = "rcid")
//    private ReportCardEntity reportCardEntity;
//
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "cid")
//    private List<SlideEntity> slideEntityList;
//
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "cid")
//    private List<AssignmentEntity> assignmentEntityList;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    @Column(name = "fid")
//    private List<ForumEntity> forumEntityList;

}
