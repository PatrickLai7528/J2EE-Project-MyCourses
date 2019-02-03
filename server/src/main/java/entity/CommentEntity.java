package entity;
/*
 * @PackageName entity
 * @ClassName CommentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.Objects;

public class CommentEntity {
    private long cmid;
    private String content;
    private String commentByEmail;

    public CommentEntity() {
    }

    public CommentEntity(long cmid, String content, String commentByEmail) {
        this.cmid = cmid;
        this.content = content;
        this.commentByEmail = commentByEmail;
    }

    public long getCmid() {
        return cmid;
    }

    public void setCmid(long cmid) {
        this.cmid = cmid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCommentByEmail() {
        return commentByEmail;
    }

    public void setCommentByEmail(String commentByEmail) {
        this.commentByEmail = commentByEmail;
    }

    @Override
    public String toString() {
        return "CommentEntity{" +
                "cmid=" + cmid +
                ", content='" + content + '\'' +
                ", commentByEmail='" + commentByEmail + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CommentEntity)) return false;
        CommentEntity that = (CommentEntity) o;
        return getCmid() == that.getCmid() &&
                Objects.equals(getContent(), that.getContent()) &&
                Objects.equals(getCommentByEmail(), that.getCommentByEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCmid(), getContent(), getCommentByEmail());
    }
}
