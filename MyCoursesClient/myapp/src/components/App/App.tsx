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
import SelectionAPI, {ISendSelectionData} from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";
import Cookies from "universal-cookie/es6";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {TeacherSider} from "../TeacherSider/TeacherSider";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import {
    ISendActionCallback,
    ISendAddCourseProps,
    ISendAssignmentProps,
    ISendCommentProps,
    ISendCourseReleaseProps, ISendCourseSelectionProps,
    ISendForumProps,
    ISendSlideProps
} from "./GeneralProps";
import {ContentRouter} from "../ContentRouter/ContentRouter";
import {SendActionHandler} from "./SendActionHandler";
import VisitorSider from "../VisitorSider/VisitorSider";

// interface IAppNonVisitorState {
//     email: string
//     releasementList: IReleasement[]
//     displayingForum?: IForum
//     setDisplayingForum: (forum: IForum) => void
// }

export interface IAppForStudentState extends ISendCourseSelectionProps, ISendCommentProps {
    displayingSelection?: ISelection
    selectionList?: ISelection[]
    email: string
    releasementList: IReleasement[]
    displayingForum?: IForum
    setDisplayingForum: (forum: IForum) => void
    onSelectionClick: (selection: ISelection) => void
}

export interface IAppForTeacherState extends ISendForumProps, ISendAssignmentProps, ISendSlideProps, ISendAddCourseProps, ISendCourseReleaseProps, ISendCommentProps {
    courseList: ICourse[]
    managingReleasement?: IReleasement
    email: string
    releasementList: IReleasement[]
    displayingForum?: IForum
    setDisplayingForum: (forum: IForum) => void
    onReleasementClick: (releasement: IReleasement) => void
}

export interface IAppForVisitorState {
    releasementList: IReleasement[]
}


interface IAppState {
    userType: UserType
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    forVisitor?: IAppForVisitorState
    // // for student sider
    // selectionList: ISelection[]
    // courseList: ICourse[]
    //
    // // for the student to select these released course,
    // // the reason why keep it here, is for better performance
    // releasementListOfStudent: IReleasement[]
    //
    // // for the teacher sider
    // releasementListOfTeacher: IReleasement[]
    //
    // // for teacher to manage their released course
    // managingReleasement?: IReleasement
    //
    // displayingSelection?: ISelection
    //
    // displayingForum?: IForum
}


export interface IAppProps {

}


export default class App extends Component<IAppProps, IAppState> {

    public constructor(props: IAppProps) {
        super(props);
        this.state = {
            userType: "visitor",
            forVisitor: {
                releasementList: []
            }
        }
    }

    public componentWillMount(): void {
        const cookie: Cookies = new Cookies();
        // console.log(cookie);
        const userType: UserType = cookie.get("userType");
        const token: string = cookie.get("token");
        const email: string = cookie.get("email");
        this.handleLogInSuccess(userType, email, token);
    }

    private setDisplayingForum(forum: IForum): void {
        // this.setState({displayingForum: forum})
        this.state.userType === "teacher" && this.state.forTeacher && this.setState({
            forTeacher: {
                ...this.state.forTeacher,
                displayingForum: forum
            }
        });

        this.state.userType === "student" && this.state.forStudent && this.setState({
            forStudent: {
                ...this.state.forStudent,
                displayingForum: forum
            }
        });
    }

    // private async getCourseOf(teacherEmail: string | undefined) {
    //     if (!teacherEmail) return;
    //     try {
    //         const response: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getCourseOf(teacherEmail);
    //         if (response.isSuccess && response.payload) this.setState({courseList: response.payload});
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // private async getSelectionOf(studentEmail: string | undefined) {
    //     if (!studentEmail) return;
    //     try {
    //         const response: IAPIResponse<ISelection[]> = await SelectionAPI.getInstance().getSelectionOf(studentEmail);
    //         if (response.isSuccess && response.payload) this.setState({selectionList: response.payload})
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // public getAllReleasement(handlePayload: (releasementList: IReleasement[]) => void): void {
    //     ReleasementAPI.getInstance().getAllReleasement()
    //         .then((response: IAPIResponse<IReleasement[]>) => {
    //             if (response.isSuccess) {
    //                 if (response.payload)
    //                     handlePayload(response.payload);
    //             } else {
    //                 message.error(response.message);
    //             }
    //         })
    //         .catch((e: any) => {
    //             console.log(e);
    //             message.error("發生未知錯誤，請稍候再試");
    //         })
    // }

    // private getReleasementOf(teacherEmail: string | undefined) {
    //     if (!teacherEmail) return;
    //     ReleasementAPI.getInstance().getReleasementOf(teacherEmail)
    //         .then((response: IAPIResponse<IReleasement[]>) => {
    //             if (response.isSuccess) {
    //                 if (response.payload)
    //                     this.setState({releasementListOfTeacher: response.payload})
    //             } else {
    //                 message.error(response.message);
    //             }
    //         })
    //         .catch((e: any) => {
    //             console.log(e);
    //             message.error("發生未知錯誤，請稍候再試");
    //         })
    // }

    // private refreshManagingReleasementByRid(rid: number, callback: () => void = () => {
    // }): void {
    //     ReleasementAPI.getInstance().getReleasementByRid(rid)
    //         .then((response: IAPIResponse<IReleasement>) => {
    //             if (response.isSuccess) {
    //                 this.setState({managingReleasement: response.payload});
    //                 callback();
    //                 console.log("完成取得Releasemnet by id");
    //                 console.log(this.state.managingReleasement);
    //             } else {
    //                 message.error(response.message);
    //             }
    //         })
    //         .catch((e: any) => {
    //             console.log(e);
    //             message.error("發生未知錯誤，請稍候再試")
    //         })
    // }

    // private handleReleaseClickFromTeacherSider(releasement: IReleasement): void {
    //     this.setState({managingReleasement: releasement})
    // }
    //
    // private handleSelectionClickFromStudentSider(selection: ISelection): void {
    //     this.setState({displayingSelection: selection})
    // }

    private async handleVisitorCome() {
        const response: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getAllReleasement();
        if (response.isSuccess && response.payload)
            this.setState({
                forVisitor: {
                    ...this.state.forVisitor,
                    releasementList: response.payload
                }
            })
    }


    private handleLogInSuccess(userType: UserType, email: string, token: string): void {

        const cookie: Cookies = new Cookies();
        cookie.remove("token");
        cookie.remove("userType");
        cookie.remove("email");

        userType === "student" ? this.handleStudentLogIn(email) : "";
        userType === "teacher" ? this.handleTeacherLogIn(email) : "";
        userType === "visitor" ? this.handleVisitorCome() : ""

        cookie.set("token", token);
        cookie.set("userType", userType);
        cookie.set("email", email);
        // if (userType === "student") {
        //     if (!email) return;
        //     this.getSelectionOf(email);
        // } else if (userType === "teacher") {
        //     if (!email) return;
        //     this.getCourseOf(email);
        //     this.getReleasementOf(email);
        // }
    }

    private sendAddCourse(data: ISendAddCourseData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: ICourse[]) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    courseList: payload
                }
            })
        };
        SendActionHandler.sendAddCourse(data, callback)(doAfter);
    }

    private sendSlide(data: ISendSlideData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    managingReleasement: payload
                }
            })
        };
        SendActionHandler.sendSlide(data, callback)(doAfter);
    }

    private sendAssignment(data: ISendAssignmentData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    managingReleasement: payload
                }
            })
        };
        SendActionHandler.sendAssignment(data, callback)(doAfter);
    }

    private sendComment(data: ISendCommentData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    managingReleasement: payload
                }
            });
            this.state.userType === "student" && this.state.forStudent &&
            this.state.forStudent.displayingSelection &&
            this.setState({
                forStudent: {
                    ...this.state.forStudent,
                    displayingSelection: {
                        ...this.state.forStudent.displayingSelection,
                        releasementEntity: payload
                    }
                }
            })
        };
        SendActionHandler.sendComment(data, callback)(doAfter);
    }

    private sendCourseRelease(data: ISendReleasementData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement[]) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    releasementList: payload
                }
            })
        };
        SendActionHandler.sendCourseRelease(data, callback)(doAfter);
    }

    private sendForum(data: ISendForumData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    managingReleasement: payload
                }
            })
        };
        SendActionHandler.sendForum(data, callback)(doAfter);
    }

    private sendCourseSelection(data: ISendSelectionData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: ISelection[]) => {
            this.state.userType === "student" && this.state.forStudent &&
            this.setState({
                forStudent: {
                    ...this.state.forStudent,
                    selectionList: payload
                }
            })
        };
        SendActionHandler.sendCourseSelection(data, callback)(doAfter);
    }

    private async handleTeacherLogIn(teacherEmail: string) {
        try {
            let courseList: ICourse[] = [];
            let releasementList: IReleasement[] = [];
            const responseOfCourse: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getCourseOf(teacherEmail);
            const responseOfReleasement: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getReleasementOf(teacherEmail);
            if (responseOfCourse.isSuccess && responseOfCourse.payload) {
                courseList = responseOfCourse.payload
            } else {
                message.error(responseOfCourse.message);
            }
            if (responseOfReleasement.isSuccess && responseOfReleasement.payload) {
                releasementList = responseOfReleasement.payload;
            } else {
                message.error(responseOfReleasement.message)
            }
            this.state.forTeacher && this.setState({
                userType: "teacher",
                forStudent: undefined,
                forVisitor: undefined,
                forTeacher: {
                    releasementList: releasementList,
                    courseList: courseList,
                    email: teacherEmail,
                    setDisplayingForum: this.setDisplayingForum.bind(this),
                    onReleasementClick: (releasement: IReleasement) => {
                        this.state.forTeacher && this.setState({
                            forTeacher: {
                                ...this.state.forTeacher,
                                managingReleasement: releasement
                            }
                        })
                    },
                    sendSlide: this.sendSlide.bind(this),
                    sendAddCourse: this.sendAddCourse.bind(this),
                    sendAssignment: this.sendAssignment.bind(this),
                    sendComment: this.sendComment.bind(this),
                    sendCourseRelease: this.sendCourseRelease.bind(this),
                    sendForum: this.sendForum.bind(this)
                }
            })
        } catch (e) {
            console.log(e);
            message.error("初始化老師失敗，請稍候再試")
        }
    }

    private async handleStudentLogIn(studentEmail: string) {
        try {
            let releasementList: IReleasement[] = [];
            let selectionList: ISelection[] = []; // use empty list for default
            const responseOfAllReleasement = await ReleasementAPI.getInstance().getAllReleasement();
            if (responseOfAllReleasement.isSuccess && responseOfAllReleasement.payload) {
                // not to show message
                releasementList = responseOfAllReleasement.payload;
            } else {
                message.error(responseOfAllReleasement.message);
            }
            const responseOfSelection = await SelectionAPI.getInstance().getSelectionOf(studentEmail);
            if (responseOfSelection.isSuccess && responseOfSelection.payload) {
                selectionList = responseOfSelection.payload;
            } else {
                message.error(responseOfSelection.message);
            }
            this.setState({
                userType: "student",
                forTeacher: undefined,
                forVisitor: undefined,
                forStudent: {
                    email: studentEmail,
                    selectionList: selectionList,
                    releasementList: releasementList,
                    setDisplayingForum: this.setDisplayingForum.bind(this),
                    onSelectionClick: (selection: ISelection) => {
                        this.state.forStudent && this.setState({
                            forStudent: {
                                ...this.state.forStudent,
                                displayingSelection: selection
                            }
                        })
                    },
                    sendComment: this.sendComment.bind(this),
                    sendCourseSelection: this.sendCourseSelection.bind(this)
                }
            })
        } catch (e) {
            console.log(e);
            message.error("初始化學生數據失敗，請稍候再試");
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
                        this.state.userType === "teacher" && this.state.forTeacher
                        && <TeacherSider
                           userType={this.state.userType}
                           {...this.state.forTeacher}
                        />
                    }
                    {
                        this.state.userType === "student" && this.state.forStudent && this.state.forStudent.selectionList
                        && <StudentSider
                           userType={this.state.userType}
                           selectionList={this.state.forStudent.selectionList}
                           onSelectionClick={this.state.forStudent.onSelectionClick}
                        />
                    }
                    {
                        this.state.userType === "visitor" && this.state.forVisitor
                        && <VisitorSider/>
                    }
                    <Layout>
                        <ContentRouter
                            userType={this.state.userType}
                            forStudent={this.state.forStudent}
                            forTeacher={this.state.forTeacher}
                            forVisitor={this.state.forVisitor}
                            // email={this.state.email}
                            //
                            // courseList={this.state.courseList}
                            // releasementList={this.state.releasementListOfStudent}
                            //
                            // managingReleasement={this.state.managingReleasement}
                            // displayingForum={this.state.displayingForum}
                            // displayingSelection={this.state.displayingSelection}
                            //
                            // setDisplayingForum={this.setDisplayingForum.bind(this)}

                            // sendAddCourse={(data: ISendAddCourseData, callback?: ISendActionCallback) => SendActionHandler.sendAddCourse(data, callback)(() => this.getCourseOf(this.state.email))}
                            // sendCourseRelease={(data: ISendReleasementData, callback?: ISendActionCallback) => SendActionHandler.sendCourseRelease(data, callback)(() => this.getReleasementOf(this.state.email))}
                            // sendCourseSelection={(data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email))}
                            // sendAssignment={(data: ISendAssignmentData, callback?: ISendActionCallback) => SendActionHandler.sendAssignment(data, callback)(() => this.refreshManagingReleasementByRid(data.rid))}
                            // sendSlide={(data: ISendSlideData, callback?: ISendActionCallback) => SendActionHandler.sendSlide(data, callback)(() => this.refreshManagingReleasementByRid(data.rid))}
                            // sendForum={(data: ISendForumData, callback?: ISendActionCallback) => SendActionHandler.sendForum(data, callback)(() => this.refreshManagingReleasementByRid(data.rid))}
                            // sendComment={(data: ISendCommentData, callback?: ISendActionCallback) => SendActionHandler.sendComment(data, callback)(() => {
                            //     this.refreshManagingReleasementByRid(data.rid, () => {
                            //         this.state.managingReleasement && this.state.managingReleasement.forumEntityList ?
                            //             this.state.managingReleasement.forumEntityList.forEach((forum: IForum) => {
                            //                 if (forum.fid === data.fid) {
                            //                     this.setDisplayingForum(forum);
                            //                }
                            //            }) : "";
                            //    });
                            //})}
                        />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

