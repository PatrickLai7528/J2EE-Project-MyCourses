import {IAppContext} from "../store/AppContext";
import {ICourse, IReleasement} from "../types/entities";

export interface ITeacherLogInSuccessPayload {
    email: string
    courseList: ICourse[]
    releasementList: IReleasement[]
}

export class TeacherReducer {
    public static teacherLogInSuccess(context: IAppContext, payload: ITeacherLogInSuccessPayload): IAppContext {
        return {
            ...context,
            userType: "teacher",
            forTeacher: {
                ...payload,
            }
        }
    }
}