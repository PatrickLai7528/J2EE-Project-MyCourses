package entity;

/*
 * @PackageName entity
 * @ClassName ReportCardEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import java.util.Map;
import java.util.Objects;

public class ReportCardEntity {
    private long rcid;
    // string for student no. double for score
    private Map<String, Double> report;

    public ReportCardEntity() {
    }

    public ReportCardEntity(long rcid, Map<String, Double> report) {
        this.rcid = rcid;
        this.report = report;
    }

    public long getRcid() {
        return rcid;
    }

    public void setRcid(long rcid) {
        this.rcid = rcid;
    }

    public Map<String, Double> getReport() {
        return report;
    }

    public void setReport(Map<String, Double> report) {
        this.report = report;
    }

    @Override
    public String toString() {
        return "ReportCardEntity{" +
                "rcid=" + rcid +
                ", report=" + report +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReportCardEntity)) return false;
        ReportCardEntity that = (ReportCardEntity) o;
        return getRcid() == that.getRcid() &&
                Objects.equals(getReport(), that.getReport());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRcid(), getReport());
    }
}
