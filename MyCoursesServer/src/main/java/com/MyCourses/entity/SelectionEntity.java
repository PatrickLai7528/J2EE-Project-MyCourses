package com.MyCourses.entity;/*
 * @PackageName com.j2ee.mycourses.entity
 * @ClassName SelectionEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.converter.SelectionStateConverter;
import com.MyCourses.entity.enums.SelectionState;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "selection_entity")
@Data
public class SelectionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "slid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long slid;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "rid")
    private ReleasementEntity releasementEntity;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_email")
    private StudentEntity studentEntity;

    @Column(name = "state")
    @Convert(converter = SelectionStateConverter.class)
    private SelectionState selectionState;
}
