package entity;

/*
 * @PackageName entity
 * @ClassName CourseEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.List;
import java.util.Objects;

public class CourseEntity {
    private long cid;
    private String name;
    private List<SlideEntity> slideEntityList;
    private List<AssignmentEntity> assignmentEntities;
    private ReportCardEntity reportCardEntity;
    private List<ForumEntity> forumEntityList;

    public CourseEntity() {
    }

    public CourseEntity(long cid, String name, List<SlideEntity> slideEntityList, List<AssignmentEntity> assignmentEntities, ReportCardEntity reportCardEntity, List<ForumEntity> forumEntityList) {
        this.cid = cid;
        this.name = name;
        this.slideEntityList = slideEntityList;
        this.assignmentEntities = assignmentEntities;
        this.reportCardEntity = reportCardEntity;
        this.forumEntityList = forumEntityList;
    }

    public long getCid() {
        return cid;
    }

    public void setCid(long cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SlideEntity> getSlideEntityList() {
        return slideEntityList;
    }

    public void setSlideEntityList(List<SlideEntity> slideEntityList) {
        this.slideEntityList = slideEntityList;
    }

    public List<AssignmentEntity> getAssignmentEntities() {
        return assignmentEntities;
    }

    public void setAssignmentEntities(List<AssignmentEntity> assignmentEntities) {
        this.assignmentEntities = assignmentEntities;
    }

    public ReportCardEntity getReportCardEntity() {
        return reportCardEntity;
    }

    public void setReportCardEntity(ReportCardEntity reportCardEntity) {
        this.reportCardEntity = reportCardEntity;
    }

    public List<ForumEntity> getForumEntityList() {
        return forumEntityList;
    }

    public void setForumEntityList(List<ForumEntity> forumEntityList) {
        this.forumEntityList = forumEntityList;
    }

    @Override
    public String toString() {
        return "CourseEntity{" +
                "cid=" + cid +
                ", name='" + name + '\'' +
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
                getName().equals(that.getName()) &&
                getSlideEntityList().equals(that.getSlideEntityList()) &&
                getAssignmentEntities().equals(that.getAssignmentEntities()) &&
                getReportCardEntity().equals(that.getReportCardEntity()) &&
                getForumEntityList().equals(that.getForumEntityList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCid(), getName(), getSlideEntityList(), getAssignmentEntities(), getReportCardEntity(), getForumEntityList());
    }
}
