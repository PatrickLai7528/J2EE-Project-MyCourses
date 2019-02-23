import DateUtils from "./DateUtils";
import {IReleasement} from "../types/entities";
import {toChinese} from "../types/enums";

export default class MarkdownGenerator {

    public static generateFromReleasement(releasement: IReleasement): string {
        const name: string = releasement.courseEntity.name ? "## " + releasement.courseEntity.name + "\n" : "";
        const teacherName: string = releasement.courseEntity.teacherEntity.name ? "### 授課老師\n - " + releasement.courseEntity.teacherEntity.name + "\n" : "";
        const effectiveDate: string = releasement.effectiveTime ? "### 開課日期\n - " + DateUtils.toShowableString(releasement.effectiveTime) + "\n" : "";
        const deadTime: string = releasement.deadTime ? "### 結課日期\n - " + DateUtils.toShowableString(releasement.deadTime) + "\n" : "";
        const approveState: string = releasement.approvalState ? "### 狀態\n -  " + toChinese(releasement.approvalState) + "\n" : "";
        // const classWeekday: string = releasement.approvalState ? "## 上課日期\n -  " + toChinese(releasement.approvalState) + "\n" : "";
        const classStart: string = releasement.startHour !== undefined && releasement.startMin !== undefined ? "### 上課時間\n - " + releasement.startHour + ":" + releasement.startMin + "\n" : "";
        const classEnd: string = releasement.endHour !== undefined && releasement.endMin !== undefined ? "### 下課時間\n - " + releasement.endHour + ":" + releasement.endMin + "\n" : "";
        return name + teacherName + effectiveDate + deadTime + approveState + classStart + classEnd;
    }
}