package com.MyCourses.entity;
/*
 * @PackageName entity
 * @ClassName ReleasementEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.MyCourses.entity.converter.ApprovalStateConverter;
import com.MyCourses.entity.converter.DateConverter;
import com.MyCourses.entity.enums.ApprovalState;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "releasement_entity")
@Data
public class ReleasementEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "rid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rid;

    @Column(name = "approval_state")
    @Convert(converter = ApprovalStateConverter.class)
    private ApprovalState approvalState;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private CourseEntity courseEntity;

    @Column(name = "start_hour")
    private int startHour;

    @Column(name = "start_min")
    private int startMin;

    @Column(name = "end_hour")
    private int endHour;

    @Column(name = "end_min")
    private int endMin;

    @Column(name = "repeat_after_day")
    private int repeatAfterNDay;

    @Column(name = "effective_time")
    @Convert(converter = DateConverter.class)
    private Date effectiveTime;

    @Column(name = "dead_time")
    @Convert(converter = DateConverter.class)
    private Date deadTime;

    @Column(name = "limit_number")
    private int limitNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rid")
    private ReportCardEntity reportCardEntity;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "rid")
    private List<SlideEntity> slideEntityList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "rid")
    private List<AssignmentEntity> assignmentEntityList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "rid")
    private List<ForumEntity> forumEntityList;
}
