package com.j2ee.mycourses.entity;
/*
 * @PackageName entity
 * @ClassName AssignmentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "assignment_entity")
public class AssignmentEntity implements Serializable {
    private long assId;
    private String title;
    private String description;
    private SlideEntity slideEntity;

    public AssignmentEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ass_id")
    public long getAssId() {
        return assId;
    }

    public void setAssId(long assId) {
        this.assId = assId;
    }

    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @MapKey(name = "sid")
    public SlideEntity getSlideEntity() {
        return slideEntity;
    }

    public void setSlideEntity(SlideEntity slideEntity) {
        this.slideEntity = slideEntity;
    }

    @Override
    public String toString() {
        return "AssignmentEntity{" +
                "assId=" + assId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", slideEntity=" + slideEntity +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssignmentEntity)) return false;
        AssignmentEntity that = (AssignmentEntity) o;
        return getAssId() == that.getAssId() &&
                Objects.equals(getTitle(), that.getTitle()) &&
                Objects.equals(getDescription(), that.getDescription()) &&
                Objects.equals(getSlideEntity(), that.getSlideEntity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAssId(), getTitle(), getDescription(), getSlideEntity());
    }
}
