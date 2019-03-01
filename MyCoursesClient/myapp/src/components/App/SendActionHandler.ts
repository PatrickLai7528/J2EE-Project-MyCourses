import {ISendActionCallback} from "./GeneralProps";
import IAPIResponse from "../../api/IAPIResponse";
import SlideAPI, {ISendSlideData} from "../../api/SlideAPI";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import ForumAPI from "../../api/ForumAPI";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import AssignmentAPI from "../../api/AssignmentAPI";
import {ISendSelectionData} from "../../api/SelectionAPI";
import SelectionAPI from "../../api/SelectionAPI";
import CourseAPI, {ISendAddCourseData, ISendReleasementData} from "../../api/CourseAPI";
import ReleasementAPI from "../../api/ReleasementAPI";
import {IForum} from "../../types/entities";


export class SendActionHandler {
    private static sendAction(fetchFromAPI: () => Promise<IAPIResponse<any>>, callback?: ISendActionCallback): (doAfter: (payload: any) => void) => void {
        return async (doAfter: (payload: any) => void) => {
            if (callback && callback.onBefore) callback.onBefore();
            try {
                const response: IAPIResponse<any> = await fetchFromAPI();
                console.log(response);
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                } else if (callback && callback.onFail) callback.onFail(response);
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


    public static sendAssignment(data: ISendAssignmentData, callback?: ISendActionCallback): (doAfter: (payload:any) => void) => void {
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
}