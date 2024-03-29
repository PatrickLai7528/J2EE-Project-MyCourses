import {ICourse, IReleasement, ISelection} from "../types/entities";
import {toApprovalState} from "../types/enums";
import {release} from "os";

export class EnumUtils {
    public static changeStringToReleasementEnum(releasement: IReleasement): IReleasement {
        if (!releasement) return releasement;
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        releasement.approvalState = toApprovalState(releasement.approvalState);
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        releasement.courseEntity.approvalState = toApprovalState(releasement.courseEntity.approvalState);
        return releasement;
    }

    public static changeStringsToReleasementEnums(releasementList: IReleasement[]): IReleasement[] {
        if (!releasementList) return releasementList;
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
        if (!course) return course;
        // @ts-ignore
        // here the enum approvalState is actually a string, so we need to make it right
        course.approvalState = toApprovalState(course.approvalState)
        return course;
    }

    public static changeStringsToCourseEnums(courseList: ICourse[]): ICourse[] {
        if (!courseList) return courseList;
        for (let course of courseList) {
            // @ts-ignore
            // here the enum approvalState is actually a string, so we need to make it right
            course.approvalState = toApprovalState(course.approvalState)
        }
        return courseList;
    }

    public static changeStringsToSelectionEnums(selectionList: ISelection[]): ISelection[] {
        if (!selectionList) return selectionList;
        for (let selection of selectionList) {
            selection.releasementEntity = this.changeStringToReleasementEnum(selection.releasementEntity);
        }
        return selectionList;
    }
}