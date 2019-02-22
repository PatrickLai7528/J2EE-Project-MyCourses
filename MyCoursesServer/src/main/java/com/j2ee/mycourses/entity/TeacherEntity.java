package com.j2ee.mycourses.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/*
 * @PackageName entity
 * @ClassName TeacherEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */
@Entity
@Table(name = "teacher_entity")
public final class TeacherEntity implements Serializable {
    private String teacherEmail;
    private String password;
    private String name;
    private Long teacherNo;

    public TeacherEntity() {
    }

    @Column(name = "teacher_email", length = 230)
    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String email) {
        this.teacherEmail = email;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tid", unique = true)
    public Long getTeacherNo() {
        return teacherNo;
    }

    public void setTeacherNo(Long teacherNo) {
        this.teacherNo = teacherNo;
    }

    @Override
    public String toString() {
        return "TeacherEntity{" +
                "email='" + teacherEmail + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", teacherNo=" + teacherNo +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TeacherEntity)) return false;
        TeacherEntity that = (TeacherEntity) o;
        return getTeacherNo().equals(that.getTeacherNo()) &&
                getTeacherEmail().equals(that.getTeacherEmail()) &&
                getPassword().equals(that.getPassword()) &&
                getName().equals(that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTeacherEmail(), getPassword(), getName(), getTeacherNo());
    }
}
