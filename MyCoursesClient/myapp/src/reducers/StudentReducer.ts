import {IAppContext} from "../store/AppContext";
import {ICourse, IForum, IReleasement} from "../types/entities";

export interface IStudentLogInPayload {
    email: string
    releasementList: IReleasement[]
    // setDisplayingForum: (forum: IForum) => void
}

export interface IAppStartPayload {
    releasementList: IReleasement[]
    superRefresh: (newContext: IAppContext) => void
    // onLogInSuccess: (ret: ILogInSuccessReturn) => void
    // onLogInFail: () => void
    // onLogInError: () => void
    // onSignUpSuccess: () => void
    // onSignUpFail: () => void
    // onSignUpError: () => void
}

export interface ITeacherLogInPayload {
    email: string
    courseList: ICourse[]
    releasementList: IReleasement[]
    setDisplayingForum: (forum: IForum) => void
}

export class StudentReducer {

    public static teacherLogIn(context: IAppContext, payload: ITeacherLogInPayload): IAppContext {
        return {
            ...context,
            userType: "teacher",
            forTeacher: {...payload}
        }
    }

    public static studentLogInSuccess(context: IAppContext, payload: IStudentLogInPayload): IAppContext {
        return {
            ...context,
            userType: "student",
            forStudent: {...payload,}
        };
    }

    public static appStart(context: IAppContext, payload: IAppStartPayload): IAppContext {
        return {
            ...context,
            userType: "visitor",
            forVisitor: {...payload}
        }
    }

}