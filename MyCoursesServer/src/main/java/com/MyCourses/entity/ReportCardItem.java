package com.MyCourses.entity;/*
 * @PackageName entity
 * @ClassName ReportCardItem
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "report_card_item")
@Data
public class ReportCardItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "rciid")
    private Long rciid;

    @Column(name = "student_no")
    private String studentNo;

    @Column(name = "score")
    private double score;
////    private ReportCardEntity reportCardEntity;
//
//    public ReportCardItem() {
//    }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "rciid")
//    public long getRciid() {
//        return rciid;
//    }
//
//    public void setRciid(long rciid) {
//        this.rciid = rciid;
//    }
//
//    @Basic
//    @Column(name = "student_no")
//    public String getStudentNo() {
//        return studentNo;
//    }
//
//    public void setStudentNo(String studentNo) {
//        this.studentNo = studentNo;
//    }
//
//    @Basic
//    @Column(name = "score")
//    public double getScore() {
//        return score;
//    }
//
//    public void setScore(double score) {
//        this.score = score;
//    }
//
////    @Column(name = "report_card_id")
////    public ReportCardEntity getReportCardEntity() {
////        return reportCardEntity;
////    }
////
////    public void setReportCardEntity(ReportCardEntity reportCardEntity) {
////        this.reportCardEntity = reportCardEntity;
////    }
//
//    @Override
//    public String toString() {
//        return "ReportCardItem{" +
//                "rciid=" + rciid +
//                ", studentNo='" + studentNo + '\'' +
//                ", score=" + score +
//                '}';
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof ReportCardItem)) return false;
//        ReportCardItem that = (ReportCardItem) o;
//        return getRciid() == that.getRciid() &&
//                Double.compare(that.getScore(), getScore()) == 0 &&
//                Objects.equals(getStudentNo(), that.getStudentNo());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(getRciid(), getStudentNo(), getScore());
//    }
}
