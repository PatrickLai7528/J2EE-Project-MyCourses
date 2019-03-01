import {ICourse, IReleasement, ISelection} from "../types/entities";
import {toApprovalState} from "../types/enums";

export class EnumUtils {
    public static changeStringToReleasementEnum(releasement: IReleasement): IReleasement {
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        releasement.approvalState = toApprovalState(item.approvalState);
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        releasement.courseEntity.approvalState = toApprovalState(item.courseEntity.approvalState);
        return releasement;
    }

    public static changeStringsToReleasementEnums(releasementList: IReleasement[]): IReleasement[] {
        for (let item of releasementList) {
            // @ts-ignore
            // here the enum approvalState is actually a string, so we need to make it right
            item.approvalState = toApprovalState(item.approvalState);
            // @ts-ignore
            // here the enum approvalState is actually a string, so we need to make it right
            item.courseEntity.approvalState = toApprovalState(item.courseEntity.approvalState);
        }
        return releasementList;
    }

    public static changeStringToCourseEnum(course: ICourse): ICourse {
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        course.approvalState = toApprovalState(course.approvalState)
        return course;
    }

    public static changeStringsToCourseEnums(courseList: ICourse[]): ICourse[] {
        for (let course of courseList) {
            // @ts-ignore
            // here the enum approvalState is actually a string, so we need to make it right
            course.approvalState = toApprovalState(course.approvalState)
        }
        return courseList;
    }

    public static changeStringsToSelectionEnums(selectionList:ISelection[]):ISelection[]{
        for(let selection of selectionList){
            selection.releasementEntity = this.changeStringToReleasementEnum(selection.releasementEntity);
        }
        return selectionList;
    }
}