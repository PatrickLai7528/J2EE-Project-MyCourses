package com.j2ee.mycourses.entity;
/*
 * @PackageName entity
 * @ClassName ReleasementEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "releasement_entity")
public class ReleasementEntity implements Serializable {
    private long rid;
    private CourseEntity courseEntity;
    private int startHour;
    private int startMin;
    private int endHour;
    private int endMin;
    private int repeatAfterNDay;
    private Date effectiveTime;
    private Date deadTime;
    private int limitNumber;

    public ReleasementEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rid")
    public long getRid() {
        return rid;
    }

    public void setRid(long rid) {
        this.rid = rid;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "cid")
    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
    }

    @Column(name = "start_hour")
    public int getStartHour() {
        return startHour;
    }

    public void setStartHour(int startHour) {
        this.startHour = startHour;
    }

    @Column(name = "start_min")
    public int getStartMin() {
        return startMin;
    }

    public void setStartMin(int startMin) {
        this.startMin = startMin;
    }

    @Column(name = "end_hour")
    public int getEndHour() {
        return endHour;
    }

    public void setEndHour(int endHour) {
        this.endHour = endHour;
    }

    @Column(name = "end_min")
    public int getEndMin() {
        return endMin;
    }

    public void setEndMin(int endMin) {
        this.endMin = endMin;
    }

    @Column(name = "repeat_after_n_day")
    public int getRepeatAfterNDay() {
        return repeatAfterNDay;
    }

    public void setRepeatAfterNDay(int repeatAfterNDay) {
        this.repeatAfterNDay = repeatAfterNDay;
    }

    @Column(name = "effective_time")
    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }

    @Column(name = "dead_time")
    public Date getDeadTime() {
        return deadTime;
    }

    public void setDeadTime(Date deadTime) {
        this.deadTime = deadTime;
    }

    @Column(name = "limit_number")
    public int getLimitNumber() {
        return limitNumber;
    }

    public void setLimitNumber(int limitNumber) {
        this.limitNumber = limitNumber;
    }

    @Override
    public String toString() {
        return "ReleasementEntity{" +
                "rid=" + rid +
                ", courseEntity=" + courseEntity +
                ", startHour=" + startHour +
                ", startMin=" + startMin +
                ", endHour=" + endHour +
                ", endMin=" + endMin +
                ", repeatAfterNDay=" + repeatAfterNDay +
                ", effectiveTime=" + effectiveTime +
                ", deadTime=" + deadTime +
                ", limitNumber=" + limitNumber +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReleasementEntity)) return false;
        ReleasementEntity that = (ReleasementEntity) o;
        return getRid() == that.getRid() &&
                getStartHour() == that.getStartHour() &&
                getStartMin() == that.getStartMin() &&
                getEndHour() == that.getEndHour() &&
                getEndMin() == that.getEndMin() &&
                getRepeatAfterNDay() == that.getRepeatAfterNDay() &&
                getLimitNumber() == that.getLimitNumber() &&
                getCourseEntity().equals(that.getCourseEntity()) &&
                getEffectiveTime().equals(that.getEffectiveTime()) &&
                getDeadTime().equals(that.getDeadTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRid(), getCourseEntity(), getStartHour(), getStartMin(), getEndHour(), getEndMin(), getRepeatAfterNDay(), getEffectiveTime(), getDeadTime(), getLimitNumber());
    }
}
