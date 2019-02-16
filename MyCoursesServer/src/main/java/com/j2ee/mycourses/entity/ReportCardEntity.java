package com.j2ee.mycourses.entity;

/*
 * @PackageName entity
 * @ClassName ReportCardEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "report_card_entity")
public class ReportCardEntity implements Serializable {
    private long rcid;
    private List<ReportCardItem> reportCardItemList   ;

    public ReportCardEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rcid")
    public long getRcid() {
        return rcid;
    }

    public void setRcid(long rcid) {
        this.rcid = rcid;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "rcid")
    public List<ReportCardItem> getReportCardItemList() {
        return reportCardItemList;
    }

    public void setReportCardItemList(List<ReportCardItem> reportCardItemList) {
        this.reportCardItemList = reportCardItemList;
    }

    @Override
    public String toString() {
        return "ReportCardEntity{" +
                "rcid=" + rcid +
                ", reportCardItemList=" + reportCardItemList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReportCardEntity)) return false;
        ReportCardEntity that = (ReportCardEntity) o;
        return getRcid() == that.getRcid() &&
                Objects.equals(getReportCardItemList(), that.getReportCardItemList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRcid(), getReportCardItemList());
    }
}
