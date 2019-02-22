package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName AdminEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-20
 * @ProjectName spring-boot-demo
 */

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "admin_entity")
@Entity
@Data
public class AdminEntity {

    @Id
    @Column(name = "admin_email")
    private String adminEmail;

    @Column(name = "password")
    private String password;
}
