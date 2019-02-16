import {ICompetition} from "../api/CompetitionAPI";
import ImageUtils from "./ImageUtils";
import DateUtils from "./DateUtils";

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
}