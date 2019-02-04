package entity;

/*
 * @PackageName entity
 * @ClassName CourseEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "course_entity")
public class CourseEntity {
    private long cid;
    private String name;
    private TeacherEntity teacherEntity;
    private List<SlideEntity> slideEntityList;
    private List<AssignmentEntity> assignmentEntities;
    private ReportCardEntity reportCardEntity;
    private List<ForumEntity> forumEntityList;

    public CourseEntity() {
    }

    @Id
    @Column(name = "cid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getCid() {
        return cid;
    }

    public void setCid(long cid) {
        this.cid = cid;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="id")
    public List<SlideEntity> getSlideEntityList() {
        return slideEntityList;
    }

    public void setSlideEntityList(List<SlideEntity> slideEntityList) {
        this.slideEntityList = slideEntityList;
    }

    @OneToMany(cascade =  CascadeType.ALL)
    @JoinColumn(name = "course_id")
    public List<AssignmentEntity> getAssignmentEntities() {
        return assignmentEntities;
    }

    public void setAssignmentEntities(List<AssignmentEntity> assignmentEntities) {
        this.assignmentEntities = assignmentEntities;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rcid", referencedColumnName = "rcid")
    public ReportCardEntity getReportCardEntity() {
        return reportCardEntity;
    }

    public void setReportCardEntity(ReportCardEntity reportCardEntity) {
        this.reportCardEntity = reportCardEntity;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @Column(name = "course_id")
    public List<ForumEntity> getForumEntityList() {
        return forumEntityList;
    }

    public void setForumEntityList(List<ForumEntity> forumEntityList) {
        this.forumEntityList = forumEntityList;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "teacher_no", referencedColumnName = "tid")
    public TeacherEntity getTeacherEntity() {
        return teacherEntity;
    }

    public void setTeacherEntity(TeacherEntity teacherEntity) {
        this.teacherEntity = teacherEntity;
    }

    @Override
    public String toString() {
        return "CourseEntity{" +
                "cid=" + cid +
                ", name='" + name + '\'' +
                ", teacherEntity=" + teacherEntity +
                ", slideEntityList=" + slideEntityList +
                ", assignmentEntities=" + assignmentEntities +
                ", reportCardEntity=" + reportCardEntity +
                ", forumEntityList=" + forumEntityList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CourseEntity)) return false;
        CourseEntity that = (CourseEntity) o;
        return getCid() == that.getCid() &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getTeacherEntity(), that.getTeacherEntity()) &&
                Objects.equals(getSlideEntityList(), that.getSlideEntityList()) &&
                Objects.equals(getAssignmentEntities(), that.getAssignmentEntities()) &&
                Objects.equals(getReportCardEntity(), that.getReportCardEntity()) &&
                Objects.equals(getForumEntityList(), that.getForumEntityList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCid(), getName(), getTeacherEntity(), getSlideEntityList(), getAssignmentEntities(), getReportCardEntity(), getForumEntityList());
    }
}
