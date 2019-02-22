package com.MyCourses.entity;

import lombok.Data;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "teacher_entity")
@Data
public class TeacherEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "teacher_email")
    private String teacherEmail;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;
    
    @Column(name = "teacher_no")
    private String teacherNo;
}
