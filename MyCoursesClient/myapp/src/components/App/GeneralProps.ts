import {UserType} from "../../api/UserAPI";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import {ISendAddCourseData, ISendReleasementData} from "../../api/CourseAPI";

export interface UserStateProps {
    userType: UserType
    email?: string
}

export interface ISendAssignmentProps {
    /**
     * send assignment callback
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}


export interface ISendSlideProps {
    /**
     * send assignment callback
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendSlide: (data: ISendSlideData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}

export interface ISendForumProps {
    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendForum: (data: ISendForumData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}

export interface ISendAddCourseProps {
    /**
     *
     * @param courseName
     * @param email
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAddCourse: (data: ISendAddCourseData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}

export interface ISendCourseReleaseProps {
    sendCourseRelease: (
        data: ISendReleasementData,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void
}

export interface ISendCourseSelectionProps{
    /**
     *
     * @param email
     * @param rid
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendCourseSelection: (email: string, rid: number, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}

export interface ISendCommentProps{
    /**
     * send Comment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendComment: (data: ISendCommentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void
}