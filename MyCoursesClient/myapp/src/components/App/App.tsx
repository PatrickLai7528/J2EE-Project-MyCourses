import * as React from "react";
import {Component} from "react";
import './App.css';
import {Layout, message} from 'antd';

import MyContent from "./../MyContent/MyContent";
import StudentSider from "../StudentSider/StudentSider";
import MyHeader from "./../MyHeader/MyHeader";
import {UserType} from "../../api/UserAPI";
import CourseAPI, {ISendReleasementData} from "../../api/CourseAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ICourse, IReleasement, ISelection} from "../../types/entities";
import TeacherSider from "../TeacherSider/TeacherSider";
import SelectionAPI from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";

interface IAppState {
    userType: UserType
    email: string | undefined

    // for student sider
    selectionList: ISelection[]
    courseList: ICourse[]

    // for the student to select these released course,
    // the reason why keep it here, is for better performance
    releasementListOfStudent: IReleasement[]

    // for the teacher sider
    releasementListOfTeacher: IReleasement[]

    // for teacher to manage their released course
    managingReleasement?: IReleasement
}

// export interface ISendSelectionProps{
//     sendSelection:
// }


export interface IAppProps {

}


export default class App extends Component<IAppProps, IAppState> {

    public constructor(props: IAppProps) {
        super(props);
        this.state = {
            userType: "visitor",
            email: undefined,
            selectionList: [],
            courseList: [],
            releasementListOfStudent: [],
            releasementListOfTeacher: []
        }
    }

    public componentWillMount(): void {
        this.getAllReleasement();
    }


    private getCourseOf(teacherEmail: string): void {
        CourseAPI.getInstance().getCourseOf(teacherEmail)
            .then((response: IAPIResponse<ICourse[]>) => {
                if (response.isSuccess) {
                    if (response.payload)
                        this.setState({courseList: response.payload});
                } else {
                    // sth
                }
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    private getSelectionOf(studentEmail: string): void {
        SelectionAPI.getInstance().getSelectionOf(studentEmail)
            .then((response: IAPIResponse<ISelection[]>) => {
                if (response.isSuccess)
                    if (response.payload)
                        this.setState({selectionList: response.payload});
            })
            .catch((e: any) => {
                console.log(e);
            })
    }


    private sendAddCourse(courseName: string, email: string,
                          onBefore?: () => void,
                          onSuccess?: (response: IAPIResponse<any>) => void,
                          onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) {
        if (onBefore) onBefore();
        CourseAPI.getInstance().sendCourse(courseName, email)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (onSuccess)
                        onSuccess(response);
                } else if (onFail)
                    onFail(response);
                this.getCourseOf(email);
            })
            .catch((e: any) => {
                console.log(e);
                if (onError) onError(e);
            })
    }

    public getAllReleasement(): void {
        ReleasementAPI.getInstance().getAllReleasement()
            .then((response: IAPIResponse<IReleasement[]>) => {
                if (response.isSuccess) {
                    if (response.payload)
                        this.setState({releasementListOfStudent: response.payload})
                } else {
                    message.error(response.message);
                }
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試");
            })
    }

    private sendCourseRelease(
        data: ISendReleasementData,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void): void {
        if (onBefore) onBefore();
        ReleasementAPI.getInstance().sendReleasement(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (onSuccess) onSuccess(response);
                    // refresh teacher sider by fetching releasement
                    if (this.state.email) this.getReleasementOf(this.state.email);
                } else {
                    if (onFail)
                        onFail(response);
                }
            })
            .catch((e: any) => {
                if (onError)
                    onError(e);
            })
    }

    private sendCourseSelection(email: string, rid: number,
                                onBefore?: () => void,
                                onSuccess?: (response: IAPIResponse<any>) => void,
                                onFail?: (response: IAPIResponse<any>) => void,
                                onError?: (e: any) => void): void {
        if (onBefore) onBefore();
        SelectionAPI.getInstance().sendSelection(email, String(rid))
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (onSuccess) onSuccess(response);
                    // by fetching a selection of current student(email)
                    // refresh the sider subitem
                    if (this.state.email) this.getSelectionOf(this.state.email);
                } else {
                    if (onFail) onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (onError) onError(e);
            })
    }

    private getReleasementOf(teacherEmail: string) {
        ReleasementAPI.getInstance().getReleasementOf(teacherEmail)
            .then((response: IAPIResponse<IReleasement[]>) => {
                if (response.isSuccess) {
                    if (response.payload)
                        this.setState({releasementListOfTeacher: response.payload})
                } else {
                    message.error(response.message);
                }
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試");
            })
    }

    private handleReleaseClickFromTeacherSider(releasement: IReleasement): void {
        this.setState({managingReleasement: releasement})
    }

    private handleLogInSuccess(userType: UserType, email: string): void {
        this.setState({userType: userType, email: email});
        if (userType === "student") {
            if (!email) return;
            this.getSelectionOf(email);
        } else if (userType === "teacher") {
            if (!email) return;
            this.getCourseOf(email);
            this.getReleasementOf(email);
        }
    }

    private handleLogInFail(): void {
    }

    private handleLogInError(): void {
    }

    private handleSignUpSuccess(): void {
    }

    private handleSignUpFail(): void {
    }

    private handleSignUpError(): void {
    }


    public render(): React.ReactNode {
        return (
            <Layout>
                <MyHeader
                    onLogInSuccess={this.handleLogInSuccess.bind(this)}
                    onLogInFail={this.handleLogInFail.bind(this)}
                    onLogInError={this.handleLogInError.bind(this)}

                    onSignUpSuccess={this.handleSignUpSuccess.bind(this)}
                    onSignUpFail={this.handleSignUpFail.bind(this)}
                    onSignUpError={this.handleSignUpError.bind(this)}
                />
                <Layout>
                    {
                        /**
                         *  default showing student sider
                         */
                        this.state.userType === "teacher" ?
                            (
                                <TeacherSider
                                    onReleasementClick={this.handleReleaseClickFromTeacherSider.bind(this)}
                                    userType={this.state.userType}
                                    email={this.state.email}
                                    releasementList={this.state.releasementListOfTeacher}
                                />
                            )
                            :
                            (
                                <StudentSider
                                    userType={this.state.userType}
                                    email={this.state.email}
                                    selectionList={this.state.selectionList}
                                />
                            )
                    }

                    <Layout>
                        <MyContent
                            userType={this.state.userType}
                            email={this.state.email}

                            courseList={this.state.courseList}
                            releasementList={this.state.releasementListOfStudent}

                            managingReleasement={this.state.managingReleasement}

                            sendAddCourse={this.sendAddCourse.bind(this)}
                            sendCourseRelease={this.sendCourseRelease.bind(this)}
                            sendCourseSelection={this.sendCourseSelection.bind(this)}
                        />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

