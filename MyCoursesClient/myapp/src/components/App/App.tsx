import * as React from "react";
import {Component} from "react";
import './App.css';
import {Layout, message} from 'antd';

import StudentSider from "../StudentSider/StudentSider";
import MyHeader from "./../MyHeader/MyHeader";
import {UserType} from "../../api/UserAPI";
import CourseAPI, {ISendAddCourseData, ISendReleasementData} from "../../api/CourseAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ICourse, IForum, IReleasement, ISelection} from "../../types/entities";
import SelectionAPI from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";
import Cookies from "universal-cookie/es6";
import AssignmentAPI, {ISendAssignmentData} from "../../api/AssignmentAPI";
import {TeacherSider} from "../TeacherSider/TeacherSider";
import SlideAPI, {ISendSlideData} from "../../api/SlideAPI";
import ForumAPI, {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import {ISendActionCallback, UserStateProps} from "./GeneralProps";
import {ContentRouter} from "../ContentRouter/ContentRouter";

interface IAppState extends UserStateProps {
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

    displayingSelection?: ISelection

    displayingForum?: IForum
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
        const cookie: Cookies = new Cookies();
        console.log(cookie);
        const token: string = cookie.get("token");
        const userType: UserType = cookie.get("userType");
        const email: string = cookie.get("email");
        if (token && userType !== "visitor" && email) {
            // already logged in and data stored in cookies
            this.handleLogInSuccess(userType, email, token);
        }

        this.getAllReleasement();
    }

    private setDisplayingForum(forum: IForum): void {
        this.setState({displayingForum: forum})
    }

    private async getCourseOf(teacherEmail: string) {
        try {
            const response: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getCourseOf(teacherEmail);
            if (response.isSuccess && response.payload) this.setState({courseList: response.payload});
        } catch (e) {
            console.log(e);
        }
    }

    private async getSelectionOf(studentEmail: string) {
        try {
            const response: IAPIResponse<ISelection[]> = await SelectionAPI.getInstance().getSelectionOf(studentEmail);
            if (response.isSuccess && response.payload) this.setState({selectionList: response.payload})
        } catch (e) {
            console.log(e);
        }
    }


    private async sendAddCourse(data: ISendAddCourseData, callback?: ISendActionCallback) {
        if (callback && callback.onBefore) callback.onBefore();
        try {
            const response: IAPIResponse<any> = await CourseAPI.getInstance().sendCourse(data);
            if (response.isSuccess) {
                if (callback && callback.onSuccess) callback.onSuccess(response);
                if (this.state.email) this.getCourseOf(this.state.email)
            } else if (callback && callback.onFail) callback.onFail(response);
        } catch (e) {
            console.log(e);
            if (callback && callback.onError) callback.onError(e);
        }
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

    private sendCourseRelease(data: ISendReleasementData, callback?: ISendActionCallback): void {
        if (callback && callback.onBefore) callback.onBefore();
        ReleasementAPI.getInstance().sendReleasement(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                    // refresh teacher course table by fetching releasement
                    if (this.state.email) this.getCourseOf(this.state.email);
                } else {
                    if (callback && callback.onFail)
                        callback.onFail(response);
                }
            })
            .catch((e: any) => {
                if (callback && callback.onError)
                    callback.onError(e);
            })
    }

    private sendCourseSelection(email: string, rid: number, callback?: ISendActionCallback): void {
        if (callback && callback.onBefore) callback.onBefore();
        SelectionAPI.getInstance().sendSelection(email, String(rid))
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                    // by fetching a selection of current student(email)
                    // refresh the sider subitem
                    if (this.state.email) this.getSelectionOf(this.state.email);
                } else {
                    if (callback && callback.onFail) callback.onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            })
    }

    private getReleasementOf(teacherEmail: string) {
        console.log("refreshing");
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

    private getReleasementByRid(rid: number, callback: () => void = () => {
    }): void {
        ReleasementAPI.getInstance().getReleasementByRid(rid)
            .then((response: IAPIResponse<IReleasement>) => {
                if (response.isSuccess) {
                    this.setState({managingReleasement: response.payload});
                    callback();
                    console.log("完成取得Releasemnet by id");
                    console.log(this.state.managingReleasement);
                } else {
                    message.error(response.message);
                }
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試")
            })
    }

    public sendAssignment(data: ISendAssignmentData, callback?: ISendActionCallback): void {
        if (callback && callback.onBefore) callback.onBefore();
        AssignmentAPI.getInstance().sendAssignment(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                    // refresh assignment by fetching specific releasement
                    this.getReleasementByRid(data.rid);
                } else {
                    if (callback && callback.onFail) callback.onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            })
    }

    private sendForum(data: ISendForumData, callback?: ISendActionCallback) {
        if (callback && callback.onBefore) callback.onBefore();
        ForumAPI.getInstance().sendForum(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                    // refresh assignment by fetching specific releasement
                    this.getReleasementByRid(data.rid);
                } else {
                    if (callback && callback.onFail) callback.onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            })
    }

    private sendComment(data: ISendCommentData, callback?: ISendActionCallback): void {
        if (callback && callback.onBefore) callback.onBefore();
        ForumAPI.getInstance().sendComment(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    // refresh by fetching specific releasement
                    this.getReleasementByRid(data.rid, () => {
                        this.state.managingReleasement && this.state.managingReleasement.forumEntityList ?
                            this.state.managingReleasement.forumEntityList.forEach((forum: IForum) => {
                                if (forum.fid === data.fid) {
                                    this.setDisplayingForum(forum);
                                }
                            }) : "";
                        if (callback && callback.onSuccess) callback.onSuccess(response);
                    });
                } else {
                    if (callback && callback.onFail) callback.onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            })
    }

    private sendSlide(data: ISendSlideData, callback?:ISendActionCallback): void {
        if (callback && callback.onBefore) callback.onBefore();
        SlideAPI.getInstance().sendSlide(data)
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess) {
                    if (callback && callback.onSuccess) callback.onSuccess(response);
                    // refresh slide by fetching specific releasement
                    this.getReleasementByRid(data.rid);
                } else {
                    if (callback && callback.onFail) callback.onFail(response);
                }
            })
            .catch((e: any) => {
                console.log(e);
                if (callback && callback.onError) callback.onError(e);
            })
    }

    private handleReleaseClickFromTeacherSider(releasement: IReleasement): void {
        this.setState({managingReleasement: releasement})
    }

    private handleSelectionClickFromStudentSider(selection: ISelection): void {
        this.setState({displayingSelection: selection})
    }

    private handleLogInSuccess(userType: UserType, email: string, token: string): void {
        this.setState({userType: userType, email: email});

        const cookie: Cookies = new Cookies();
        cookie.set("token", token);
        cookie.set("userType", userType);
        cookie.set("email", email);
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
                                    onSelectionClick={this.handleSelectionClickFromStudentSider.bind(this)}
                                    userType={this.state.userType}
                                    email={this.state.email}
                                    selectionList={this.state.selectionList}
                                />
                            )
                    }

                    <Layout>
                        <ContentRouter
                            userType={this.state.userType}
                            email={this.state.email}

                            courseList={this.state.courseList}
                            releasementList={this.state.releasementListOfStudent}

                            managingReleasement={this.state.managingReleasement}
                            displayingForum={this.state.displayingForum}
                            displayingSelection={this.state.displayingSelection}

                            setDisplayingForum={this.setDisplayingForum.bind(this)}

                            sendAddCourse={this.sendAddCourse.bind(this)}
                            sendCourseRelease={this.sendCourseRelease.bind(this)}
                            sendCourseSelection={this.sendCourseSelection.bind(this)}
                            sendAssignment={this.sendAssignment.bind(this)}
                            sendSlide={this.sendSlide.bind(this)}
                            sendForum={this.sendForum.bind(this)}
                            sendComment={this.sendComment.bind(this)}
                        />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

