package com.j2ee.mycourses.entity;
/*
 * @PackageName entity
 * @ClassName CommentEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "comment_entity")
public class CommentEntity {
    private long cmid;
    private String content;
    private String messageFrom;

    public CommentEntity() {
    }

    @Id
    @Column(name = "cmid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getCmid() {
        return cmid;
    }

    public void setCmid(long cmid) {
        this.cmid = cmid;
    }

    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name="message_from")
    public String getMessageFrom() {
        return messageFrom;
    }

    public void setMessageFrom(String commentByEmail) {
        this.messageFrom = commentByEmail;
    }

    @Override
    public String toString() {
        return "CommentEntity{" +
                "cmid=" + cmid +
                ", content='" + content + '\'' +
                ", commentByEmail='" + messageFrom + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CommentEntity)) return false;
        CommentEntity that = (CommentEntity) o;
        return getCmid() == that.getCmid() &&
                Objects.equals(getContent(), that.getContent()) &&
                Objects.equals(getMessageFrom(), that.getMessageFrom());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCmid(), getContent(), getMessageFrom());
    }
}
