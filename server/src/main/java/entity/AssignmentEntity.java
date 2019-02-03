package entity;
/*
 * @PackageName entity
 * @ClassName AssignmentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.Objects;

public class AssignmentEntity {
    private long assId;
    private String title;
    private String description;
    private SlideEntity slideEntity;

    public AssignmentEntity() {
    }

    public AssignmentEntity(long assId, String title, String description, SlideEntity slideEntity) {
        this.assId = assId;
        this.title = title;
        this.description = description;
        this.slideEntity = slideEntity;
    }

    public long getAssId() {
        return assId;
    }

    public void setAssId(long assId) {
        this.assId = assId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

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
