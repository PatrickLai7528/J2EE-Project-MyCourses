package com.j2ee.mycourses.entity;/*
 * @PackageName com.j2ee.mycourses.entity
 * @ClassName SelectionEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "selection_entity")
public class SelectionEntity implements Serializable {

    private long slid;
    private ReleasementEntity releasementEntity;
    private StudentEntity studentEntity;
    private SelectionState selectionState;

    @Id
    @Column(name = "slid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getSlid() {
        return slid;
    }

    public void setSlid(long slid) {
        this.slid = slid;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "rid")
    public ReleasementEntity getReleasementEntity() {
        return releasementEntity;
    }

    public void setReleasementEntity(ReleasementEntity releasementEntity) {
        this.releasementEntity = releasementEntity;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "semail")
    public StudentEntity getStudentEntity() {
        return studentEntity;
    }

    public void setStudentEntity(StudentEntity studentEntity) {
        this.studentEntity = studentEntity;
    }

    @Column(name = "state")
    @Convert(converter = SelectionStateConverter.class)
    public SelectionState getSelectionState() {
        return selectionState;
    }

    public void setSelectionState(SelectionState selectionState) {
        this.selectionState = selectionState;
    }

    @Override
    public String toString() {
        return "SelectionEntity{" +
                "slid=" + slid +
                ", releasementEntity=" + releasementEntity +
                ", studentEntity=" + studentEntity +
                ", selectionState=" + selectionState +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SelectionEntity)) return false;
        SelectionEntity that = (SelectionEntity) o;
        return getSlid() == that.getSlid() &&
                Objects.equals(getReleasementEntity(), that.getReleasementEntity()) &&
                Objects.equals(getStudentEntity(), that.getStudentEntity()) &&
                getSelectionState() == that.getSelectionState();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSlid(), getReleasementEntity(), getStudentEntity(), getSelectionState());
    }
}
