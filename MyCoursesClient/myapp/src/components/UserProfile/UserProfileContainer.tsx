import * as React from "react";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {UserType} from "../../api/UserAPI";
import {Divider} from "antd";
import {WrappedTeacherProfile} from "./TeacherProfile";
import {WrappedStudentProfile} from "./StudentProfile";

export interface IUserProfileProps {
    userType: UserType
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
}

interface IUserProfileState {

}

export class UserProfileContainer extends React.Component<IUserProfileProps, IUserProfileState> {
    public render(): React.ReactNode {
        return (
            <div>
                <h1>個人資料</h1>
                <Divider/>
                {
                    this.showProfile()
                }
            </div>
        )
    }

    private showProfile(): React.ReactNode {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "teacher" && forTeacher) {
            return <WrappedTeacherProfile forTeacher={forTeacher}/>;
        } else if (userType === "student" && forStudent) {
            return <WrappedStudentProfile forStudent={forStudent}/>;
        }
        throw new Error();
    }
}