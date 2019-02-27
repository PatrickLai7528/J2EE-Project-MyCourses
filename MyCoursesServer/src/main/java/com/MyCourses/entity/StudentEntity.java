package com.MyCourses.entity;

import com.MyCourses.entity.converter.DetailDateConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/*
 * @PackageName entity
 * @ClassName TeacherEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

@Entity
@Table(name = "student_entity")
@Data
public final class StudentEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "student_email")
    private String studentEmail;

    @Column(name = "password")
    private String password;

    @Column(name = "registry_time")
    @Convert(converter = DetailDateConverter.class)
    private Date registryTime;


    @Column(name = "name")
    private String name;

    @Column(name = "student_no")
    private String studentNo;

    @Column(name = "deleted")
    private boolean deleted;
}
