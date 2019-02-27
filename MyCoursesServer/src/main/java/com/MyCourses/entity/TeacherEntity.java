package com.MyCourses.entity;

import com.MyCourses.entity.converter.DetailDateConverter;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

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

    @Column(name = "registry_time")
    @Convert(converter = DetailDateConverter.class)
    private Date registryTime;


    @Column(name = "password")
    private String password;
    
    @Column(name = "teacher_no")
    private String teacherNo;
}
