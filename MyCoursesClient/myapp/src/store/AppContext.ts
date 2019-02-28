import { UserType} from "../api/UserAPI";
import {ICourse, IForum, IReleasement, ISelection} from "../types/entities";
import {
    ISendActionCallback,
    ISendAddCourseProps,
    ISendAssignmentProps, ISendCommentProps,
    ISendCourseReleaseProps,
    ISendCourseSelectionProps, ISendForumProps, ISendSlideProps
} from "../components/App/GeneralProps";
import {ISendSlideData} from "../api/SlideAPI";
import {ISendAddCourseData, ISendReleasementData} from "../api/CourseAPI";
import {ISendAssignmentData} from "../api/AssignmentAPI";
import {ISendCommentData, ISendForumData} from "../api/ForumAPI";
import {ISendSelectionData} from "../api/SelectionAPI";

interface IAppNonVisitorContext {
    email: string
    displayingForum?: IForum
    releasementList: IReleasement[]
    // setDisplayingForum: (forum: IForum) => void
}

export interface IAppStudentContext extends IAppNonVisitorContext {
    displayingSelection?: ISelection
    selectionList?: ISelection[]
    email: string
}

export interface IAppTeacherContext extends IAppNonVisitorContext {
    courseList: ICourse[]
    managingReleasement?: IReleasement
    email: string
}

export interface IAppVisitorContext {
    releasementList: IReleasement[]
    // onLogInSuccess: (ret: ILogInSuccessReturn) => void
    // onLogInFail: () => void
    // onLogInError: () => void
    // onSignUpSuccess: () => void
    // onSignUpFail: () => void
    // onSignUpError: () => void
}


export interface IAppContext extends ISendSlideProps, ISendAssignmentProps, ISendAddCourseProps, ISendCourseReleaseProps, ISendCourseSelectionProps, ISendForumProps, ISendCommentProps {
    userType: UserType
    superRefresh: (newContext: IAppContext) => void
    forStudent?: IAppStudentContext
    forTeacher?: IAppTeacherContext
    forVisitor?: IAppVisitorContext
}

export const defaultAppContext: IAppContext = {
    userType: "visitor",
    sendSlide: (data: ISendSlideData, callback?: ISendActionCallback) => {
    },
    sendAddCourse: (data: ISendAddCourseData, callback?: ISendActionCallback) => {
    },
    sendAssignment: (data: ISendAssignmentData, callback?: ISendActionCallback) => {
    },
    sendComment: (data: ISendCommentData, callback?: ISendActionCallback) => {
    },
    sendCourseRelease: (data: ISendReleasementData, callback?: ISendActionCallback) => {
    },
    sendCourseSelection: (data: ISendSelectionData, callback?: ISendActionCallback) => {
    },
    sendForum: (data: ISendForumData, callback?: ISendActionCallback) => {
    },
    superRefresh: (newContext: IAppContext) => {
    }
};