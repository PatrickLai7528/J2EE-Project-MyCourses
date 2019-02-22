import * as React from "react";
import {Component} from "react";
import './App.css';
import {Layout} from 'antd';

import MyContent from "./../MyContent/MyContent";
import StudentSider from "../StudentSider/StudentSider";
import MyHeader from "./../MyHeader/MyHeader";
import {UserType} from "../../api/UserAPI";
import CourseAPI, {ISendReleasementData} from "../../api/CourseAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ICourse, ISelection} from "../../types/entities";
import TeacherSider from "../TeacherSider/TeacherSider";
import SelectionAPI from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";

interface IAppState {
    userType: UserType
    email: string | undefined
    selectionList: ISelection[]
    courseList: ICourse[]
}

export interface IAppProps {

}


export default class App extends Component<IAppProps, IAppState> {

    public constructor(props: IAppProps) {
        super(props);
        this.state = {
            userType: "visitor",
            email: undefined,
            selectionList: [],
            courseList: []
        }
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

    private handleLogInSuccess(userType: UserType, email: string): void {
        this.setState({userType: userType, email: email});
        if (userType === "student") {
            if (!email) return;
            this.getSelectionOf(email);
        } else if (userType === "teacher") {
            if (!email) return;
            this.getCourseOf(email)
        }
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

    // private reduceCourse(cid: number): void {
    //     let {courseList} = this.state;
    //     for (let i = 0; i < courseList.length; i++) {
    //         if (courseList[i].cid === cid) {
    //             courseList.splice(i, 1)
    //         }
    //     }
    // }

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
                    if (onSuccess)
                        onSuccess(response);
                    // this.reduceCourse(data.cid)
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
                        this.state.userType !== "student" ?
                            (
                                <TeacherSider
                                    userType={this.state.userType}
                                    email={this.state.email}/>
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
                            sendAddCourse={this.sendAddCourse.bind(this)}
                            sendCourseRelease={this.sendCourseRelease.bind(this)}
                        />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

