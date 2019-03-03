import {ISendActionCallback} from "./GeneralProps";
import IAPIResponse from "../../api/IAPIResponse";
import SlideAPI, {ISendSlideData} from "../../api/SlideAPI";
import ForumAPI, {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import AssignmentAPI, {ISendAssignmentData, ISendSubmissionData} from "../../api/AssignmentAPI";
import SelectionAPI, {ISendSelectionData} from "../../api/SelectionAPI";
import CourseAPI, {ISendAddCourseData, ISendReleasementData} from "../../api/CourseAPI";
import ReleasementAPI from "../../api/ReleasementAPI";
import {
    AdminAPI,
    ICourseApproveData,
    ICourseRejectData,
    IReleasementApproveData,
    IReleasementRejectData
} from "../../api/AdminAPI";


export class SendActionHandler {
    private static sendAction(fetchFromAPI: () => Promise<IAPIResponse<any>>, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return async (doAfter: (payload: any) => void) => {
            if (callback && callback.onBefore) callback.onBefore();
            try {
                const response: IAPIResponse<any> = await fetchFromAPI();
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                } else if (callback && callback.onFail) callback.onFail(response);
                if (response.payload)
                    doAfter(response.payload);
            } catch (e) {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            }
        };
    }

    public static sendSlide(data: ISendSlideData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await SlideAPI.getInstance().sendSlide(data)
            }, callback);
    }

    public static sendForum(data: ISendForumData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await ForumAPI.getInstance().sendForum(data);
            }, callback);
    }


    public static sendAssignment(data: ISendAssignmentData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AssignmentAPI.getInstance().sendAssignment(data);
            }, callback);
    }

    public static sendCourseSelection(data: ISendSelectionData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await SelectionAPI.getInstance().sendSelection(data);
            }, callback);
    }

    public static sendCourseRelease(data: ISendReleasementData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await ReleasementAPI.getInstance().sendReleasement(data);
            }, callback);
    }

    public static sendAddCourse(data: ISendAddCourseData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await CourseAPI.getInstance().sendCourse(data);
            }, callback);
    }


    public static sendComment(data: ISendCommentData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await ForumAPI.getInstance().sendComment(data);
            }, callback);
    }

    public static sendSubmission(data: ISendSubmissionData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AssignmentAPI.getInstance().sendSubmission(data);
            }, callback);
    }

    public static sendCourseApprove(data: ICourseApproveData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AdminAPI.getInstance().sendCourseApprove(data);
            }, callback);
    }

    public static sendCourseReject(data: ICourseRejectData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AdminAPI.getInstance().sendCourseReject(data);
            }, callback);
    }

    public static sendReleasementApprove(data: IReleasementApproveData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AdminAPI.getInstance().sendReleasementApprove(data);
            }, callback);
    }

    public static sendReleasementReject(data: IReleasementRejectData, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return this.sendAction(
            async () => {
                return await AdminAPI.getInstance().sendReleasementReject(data);
            }, callback);
    }
}