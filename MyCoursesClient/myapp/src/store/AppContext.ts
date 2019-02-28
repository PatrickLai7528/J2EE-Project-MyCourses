import {UserType} from "../api/UserAPI";
import {ICourse, IForum, IReleasement, ISelection} from "../types/entities";
import {
    ISendAddCourseProps,
    ISendAssignmentProps, ISendCommentProps,
    ISendCourseReleaseProps,
    ISendCourseSelectionProps, ISendForumProps, ISendSlideProps
} from "../components/App/GeneralProps";

interface IAppNonVisitorContext {
    email: string
    displayingForum?: IForum
    releasementList: IReleasement[]
    setDisplayingForum: (forum: IForum) => void
}

export interface IAppStudentContext extends IAppNonVisitorContext {
    displayingSelection?: ISelection
    email: string
}

export interface IAppTeacherContext extends IAppNonVisitorContext {
    courseList: ICourse[]
    managingReleasement?: IReleasement
    email: string
}

export interface IAppVisitorContext {
    releasementList: IReleasement[]
}


export interface IAppContext extends ISendSlideProps, ISendAssignmentProps, ISendAddCourseProps, ISendCourseReleaseProps, ISendCourseSelectionProps, ISendForumProps, ISendCommentProps {
    userType: UserType
    forStudent?: IAppStudentContext
    forTeacher?: IAppTeacherContext
    forVisitor?: IAppVisitorContext
}

// export const defaultAppContext: IAppContext = {
//     userType: "visitor",
//     data: {releasementList: []}
// };