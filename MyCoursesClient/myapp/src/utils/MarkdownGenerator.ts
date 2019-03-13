import DateUtils from "./DateUtils";
import {IReleasement} from "../types/entities";
import {fromApprovalStateToChinese} from "../types/enums";

export default class MarkdownGenerator {

    public static generateFromReleasement(releasement: IReleasement): string {
        const name: string = releasement.courseEntity.name ? "## " + releasement.courseEntity.name + "\n" : "";
        const teacherName: string = releasement.courseEntity.teacherEntity.name ? "### 授課老師\n - " + releasement.courseEntity.teacherEntity.name + "\n" : "";
        const effectiveDate: string = releasement.effectiveTime ? "### 開課日期\n - " + DateUtils.toShowableString(releasement.effectiveTime) + "\n" : "";
        const deadTime: string = releasement.deadTime ? "### 結課日期\n - " + DateUtils.toShowableString(releasement.deadTime) + "\n" : "";
        const approveState: string = releasement.approvalState ? "### 狀態\n -  " + fromApprovalStateToChinese(releasement.approvalState) + "\n" : "";
        // const classWeekday: string = releasement.approvalState ? "## 上課日期\n -  " + toChinese(releasement.approvalState) + "\n" : "";
        const classStart: string = releasement.startHour !== undefined && releasement.startMin !== undefined ? "### 上課時間\n - " + (releasement.startHour < 10 ? "0" + releasement.startHour : releasement.startHour) + ":" + (releasement.startMin < 10 ? "0" + releasement.startMin : releasement.startMin) + "\n" : "";
        const classEnd: string = releasement.endHour !== undefined && releasement.endMin !== undefined ? "### 下課時間\n - " + (releasement.endHour < 10 ? "0" + releasement.endHour : releasement.endHour) + ":" + (releasement.endMin < 10 ? "0" + releasement.endMin : releasement.endMin)+ "\n" : "";
        const onceOrTwice: string = releasement.repeatAfterDay ? "### 單/雙週\n" + (releasement.repeatAfterDay === 7 ? "- 單週\n" : "- 雙週\n") : "";
        const limit: string = releasement.limitNumber ? "### 限選人數\n - " + releasement.limitNumber + "\n" : "";
        return name + teacherName + effectiveDate + deadTime + approveState + classStart + classEnd + onceOrTwice + limit;
    }
}