package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName SubmissionEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.converter.DetailDateConverter;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "submission_entity")
public class SubmissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "smid")
    private Long smid;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_email")
    private StudentEntity studentEntity;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "submit_time")
    @Convert(converter = DetailDateConverter.class)
    private Date submitTime;
}
