import {UserType} from "../api/UserAPI";
import {ICourse, IForum, IReleasement, ISelection} from "../types/entities";

interface IAppNonVisitorContext {
    email: string
    displayingForum?: IForum
    releasement: IReleasement[]
    setDisplayingForum: (forum: IForum) => void
}

export interface IAppStudentContext extends IAppNonVisitorContext{
    displayingSelection?: ISelection[]
}

export interface IAppTeacherContext extends IAppNonVisitorContext{
    courseList: ICourse[]
    managingReleasement: IReleasement[]
}

export interface IAppDefaultVisitorContext {
    releasementList: IReleasement[]
}

export interface IAppContext {
    userType: UserType
    data: IAppTeacherContext | IAppStudentContext | IAppDefaultVisitorContext
}

export const defaultAppContext: IAppContext = {
    userType: "visitor",
    data: {releasementList: []}
};