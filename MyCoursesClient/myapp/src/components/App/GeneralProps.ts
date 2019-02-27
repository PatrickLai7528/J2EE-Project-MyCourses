import {UserType} from "../../api/UserAPI";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import {ISendAddCourseData, ISendReleasementData} from "../../api/CourseAPI";
import {ISendSelectionData} from "../../api/SelectionAPI";

export interface UserStateProps {
    userType: UserType
    email?: string
}

export interface ISendActionCallback {
    onBefore?: () => void,
    onSuccess?: (response: IAPIResponse<any>) => void,
    onFail?: (response: IAPIResponse<any>) => void,
    onError?: (e: any) => void
}

export interface ISendAssignmentProps {
    sendAssignment: (data: ISendAssignmentData, callback?: ISendActionCallback) => void
}


export interface ISendSlideProps {
    sendSlide: (data: ISendSlideData, callback?: ISendActionCallback) => void
}

export interface ISendForumProps {
    sendForum: (data: ISendForumData, callback?: ISendActionCallback) => void
}

export interface ISendAddCourseProps {
    sendAddCourse: (data: ISendAddCourseData, callback?: ISendActionCallback) => void
}

export interface ISendCourseReleaseProps {
    sendCourseRelease: (data: ISendReleasementData, callback?: ISendActionCallback) => void
}

export interface ISendCourseSelectionProps {
    sendCourseSelection: (data: ISendSelectionData, callback?: ISendActionCallback) => void
}

export interface ISendCommentProps {
    sendComment: (data: ISendCommentData, callback?: ISendActionCallback) => void
}