package entity;

/*
 * @PackageName entity
 * @ClassName ForumEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-3
 * @ProjectName server
 */

import java.util.List;
import java.util.Objects;

public class ForumEntity {
    private long fid;
    private String topic;
    private List<CommentEntity> commentEntityList;

    public ForumEntity() {
    }

    public ForumEntity(long fid, String topic, List<CommentEntity> commentEntityList) {
        this.fid = fid;
        this.topic = topic;
        this.commentEntityList = commentEntityList;
    }

    public long getFid() {
        return fid;
    }

    public void setFid(long fid) {
        this.fid = fid;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public List<CommentEntity> getCommentEntityList() {
        return commentEntityList;
    }

    public void setCommentEntityList(List<CommentEntity> commentEntityList) {
        this.commentEntityList = commentEntityList;
    }

    @Override
    public String toString() {
        return "ForumEntity{" +
                "fid=" + fid +
                ", topic='" + topic + '\'' +
                ", commentEntityList=" + commentEntityList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ForumEntity)) return false;
        ForumEntity that = (ForumEntity) o;
        return getFid() == that.getFid() &&
                getTopic().equals(that.getTopic()) &&
                getCommentEntityList().equals(that.getCommentEntityList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFid(), getTopic(), getCommentEntityList());
    }
}
