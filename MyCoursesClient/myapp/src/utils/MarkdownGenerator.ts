import {ICompetition} from "../api/CompetitionAPI";
import ImageUtils from "./ImageUtils";
import DateUtils from "./DateUtils";
import {ICourse, IReleasement} from "../types/entities";
import {toChinese} from "../types/enums";

export default class MarkdownGenerator {
    public static generateFromCompetition(competition: ICompetition): string {
        const name: string = competition.name ? "# " + competition.name + "\n" : "";
        const type: string = competition.type ? "## 類型\n - " + competition.type.chinese + "\n" : "";
        const startDate: string = competition.startDate ? "## 開始日期\n - " + DateUtils.toShowableString(competition.startDate) + "\n" : "";
        const ddl: string = competition.ddl ? "## 截止日期\n - " + DateUtils.toShowableString(competition.ddl) + "\n" : "";
        const awardSum: string = competition.awardSum ? "## 獎金總量\n -  " + competition.awardSum + "\n" : "";
        const description: string = competition.description ? "## 描述\n " + competition.description + "\n" : "";
        let image: string = "";
        if (competition.imagePath) {
            image += "## 章程/海報\n";
            for (let imagePath of competition.imagePath) {
                image += " <img src='" + ImageUtils.getOkToSendPath(imagePath) + "' width = '100%' alt='章程/海報' align=center />\n"
                // image += "![](" + ImageUtils.getOkToSendPath(imagePath) + ")\n";
            }
        }
        return name + type + startDate + ddl + awardSum + description + image;
    }

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