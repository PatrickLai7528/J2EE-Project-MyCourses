package entity;

/*
 * @PackageName entity
 * @ClassName SlideEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.Objects;

public class SlideEntity {
    private long sid;
    private String title;
    private String filePath;

    public SlideEntity() {
    }

    public SlideEntity(long sid, String title, String filePath) {
        this.sid = sid;
        this.title = title;
        this.filePath = filePath;
    }

    public long getSid() {
        return sid;
    }

    public void setSid(long sid) {
        this.sid = sid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public String toString() {
        return "SlideEntity{" +
                "sid=" + sid +
                ", title='" + title + '\'' +
                ", filePath='" + filePath + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SlideEntity)) return false;
        SlideEntity that = (SlideEntity) o;
        return getSid() == that.getSid() &&
                Objects.equals(getTitle(), that.getTitle()) &&
                Objects.equals(getFilePath(), that.getFilePath());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSid(), getTitle(), getFilePath());
    }
}
