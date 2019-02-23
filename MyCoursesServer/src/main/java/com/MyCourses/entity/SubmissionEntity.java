package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName SubmissionEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "submission_entity")
public class SubmissionEntity {

    @Id
    @Column(name = "smid")
    private Long smid;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_email")
    private StudentEntity studentEntity;

    @Column(name = "file_path")
    private String filePath;
}
