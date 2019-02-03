package entity;
/*
 * @PackageName entity
 * @ClassName ReleasementEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.Date;
import java.util.Objects;

public class ReleasementEntity {
    private long rid;
    private  CourseEntity courseEntity;
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

    public ReleasementEntity(long rid, CourseEntity courseEntity, int startHour, int startMin, int endHour, int endMin, int repeatAfterNDay, Date effectiveTime, Date deadTime, int limitNumber) {
        this.rid = rid;
        this.courseEntity = courseEntity;
        this.startHour = startHour;
        this.startMin = startMin;
        this.endHour = endHour;
        this.endMin = endMin;
        this.repeatAfterNDay = repeatAfterNDay;
        this.effectiveTime = effectiveTime;
        this.deadTime = deadTime;
        this.limitNumber = limitNumber;
    }

    public long getRid() {
        return rid;
    }

    public void setRid(long rid) {
        this.rid = rid;
    }

    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
    }

    public int getStartHour() {
        return startHour;
    }

    public void setStartHour(int startHour) {
        this.startHour = startHour;
    }

    public int getStartMin() {
        return startMin;
    }

    public void setStartMin(int startMin) {
        this.startMin = startMin;
    }

    public int getEndHour() {
        return endHour;
    }

    public void setEndHour(int endHour) {
        this.endHour = endHour;
    }

    public int getEndMin() {
        return endMin;
    }

    public void setEndMin(int endMin) {
        this.endMin = endMin;
    }

    public int getRepeatAfterNDay() {
        return repeatAfterNDay;
    }

    public void setRepeatAfterNDay(int repeatAfterNDay) {
        this.repeatAfterNDay = repeatAfterNDay;
    }

    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }

    public Date getDeadTime() {
        return deadTime;
    }

    public void setDeadTime(Date deadTime) {
        this.deadTime = deadTime;
    }

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
