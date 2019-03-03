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
import {ISendAssignmentData, ISendSubmissionData} from "../../api/AssignmentAPI";
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
    ISendSlideProps, ISendSubmissionProps
} from "./GeneralProps";
import {ContentRouter} from "../ContentRouter/ContentRouter";
import {SendActionHandler} from "./SendActionHandler";
import VisitorSider from "../VisitorSider/VisitorSider";
import {AdminSider} from "../AdminSider/AdminSider";
import {
    ICourseApproveData,
    ICourseRejectData,
    IReleasementApproveData,
    IReleasementRejectData
} from "../../api/AdminAPI";

export interface IAppForStudentState extends ISendCourseSelectionProps, ISendCommentProps, ISendForumProps, ISendSubmissionProps {
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

export interface IAppForAdminState {
    email: string
    courseList: ICourse[]
    releasementList: IReleasement[]
    sendCourseReject: (data: ICourseRejectData, callback?: ISendActionCallback) => void
    sendCourseApprove: (data: ICourseApproveData, callback?: ISendActionCallback) => void
    sendReleasementApprove: (data: IReleasementApproveData, callback?: ISendActionCallback) => void
    sendReleasementReject: (data: IReleasementRejectData, callback?: ISendActionCallback) => void

}

interface IAppState {
    userType: UserType
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    forVisitor?: IAppForVisitorState
    forAdmin?: IAppForAdminState
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

    private async handleVisitorCome() {
        const response: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getAvailableReleasement();
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
        console.log(cookie);
        cookie.remove("token");
        cookie.remove("userType");
        cookie.remove("email");
        console.log(cookie);
        cookie.set("token", token);
        cookie.set("userType", userType);
        cookie.set("email", email);

        if (userType === "student")
            this.handleStudentLogIn(email);
        if (userType === "teacher")
            this.handleTeacherLogIn(email);
        if (userType === "visitor")
            this.handleVisitorCome();
        if (userType === "admin")
            this.handleAdminLogIn(email);

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
        const doAfter: (payload: any) => void = (payload: IForum) => {
            this.state.userType === "teacher" && this.state.forTeacher &&
            this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    displayingForum: {...payload}
                }
            });
            this.state.userType === "student" && this.state.forStudent &&
            this.state.forStudent.displayingSelection &&
            this.setState({
                forStudent: {
                    ...this.state.forStudent,
                    displayingForum: {...payload}
                }
            });
        };
        SendActionHandler.sendComment(data, callback)(doAfter);
    }

    private sendCourseRelease(data: ISendReleasementData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement[]) => {
            console.log(payload);
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
            this.state.forTeacher &&
            this.state.userType === "teacher" && this.setState({
                forTeacher: {
                    ...this.state.forTeacher,
                    managingReleasement: payload
                }
            });
            this.state.userType === "student" && this.state.forStudent && this.state.forStudent.displayingSelection && this.setState({
                forStudent: {
                    ...this.state.forStudent,
                    displayingSelection: {
                        ...this.state.forStudent.displayingSelection,
                        releasementEntity: payload
                    }
                }
            })
        };
        SendActionHandler.sendForum(data, callback)(doAfter);
    }

    private sendSubmission(data: ISendSubmissionData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: ISelection) => {
            this.state.userType === "student" && this.state.forStudent &&
            this.setState({
                forStudent: {
                    ...this.state.forStudent,
                    displayingSelection: {...payload}
                }
            })
        };
        SendActionHandler.sendSubmission(data, callback)(doAfter);
    }

    private sendReleasementApprove(data: IReleasementApproveData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement[]) => {
            this.state.userType === "admin" && this.state.forAdmin &&
            this.setState({
                forAdmin: {
                    ...this.state.forAdmin,
                    releasementList: payload
                }
            })
        };
        SendActionHandler.sendReleasementApprove(data, callback)(doAfter);
    }

    private sendReleasementReject(data: IReleasementRejectData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: IReleasement[]) => {
            this.state.userType === "admin" && this.state.forAdmin &&
            this.setState({
                forAdmin: {
                    ...this.state.forAdmin,
                    releasementList: payload
                }
            })
        };
        SendActionHandler.sendReleasementReject(data, callback)(doAfter);
    }

    private sendCourseApprove(data: ICourseApproveData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: ICourse[]) => {
            this.state.userType === "admin" && this.state.forAdmin &&
            this.setState({
                forAdmin: {
                    ...this.state.forAdmin,
                    courseList: payload
                }
            })
        };
        SendActionHandler.sendCourseApprove(data, callback)(doAfter);
    }

    private sendCourseReject(data: ICourseRejectData, callback?: ISendActionCallback): void {
        const doAfter: (payload: any) => void = (payload: ICourse[]) => {
            this.state.userType === "admin" && this.state.forAdmin &&
            this.setState({
                forAdmin: {
                    ...this.state.forAdmin,
                    courseList: payload
                }
            })
        };
        SendActionHandler.sendCourseReject(data, callback)(doAfter);
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
        console.log("teacher log in");
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
            this.setState({
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
            });
        } catch (e) {
            console.log(e);
            message.error("初始化老師失敗，請稍候再試")
        }
    }

    private async handleAdminLogIn(email: string) {
        try {
            let releasementList: IReleasement[] = [];
            let courseList: ICourse[] = [];
            const responseOfAllCourse: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getAllCourse();
            const responseOfAllReleasement: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getAllReleasement();
            if (responseOfAllCourse.isSuccess && responseOfAllCourse.payload)
                courseList = responseOfAllCourse.payload;
            else
                message.error(responseOfAllCourse.message);
            if (responseOfAllReleasement.isSuccess && responseOfAllReleasement.payload)
                releasementList = responseOfAllReleasement.payload;
            else
                message.error(responseOfAllReleasement.message);
            this.setState({
                userType: "admin",
                forStudent: undefined,
                forTeacher: undefined,
                forVisitor: undefined,
                forAdmin: {
                    email: email,
                    releasementList: releasementList,
                    courseList: courseList,
                    sendCourseApprove: this.sendCourseApprove.bind(this),
                    sendCourseReject: this.sendCourseReject.bind(this),
                    sendReleasementApprove: this.sendReleasementApprove.bind(this),
                    sendReleasementReject: this.sendReleasementReject.bind(this)
                }
            })
        } catch (e) {
            console.log(e);
            message.error("初始化管理員數據失敗，請稍候再試")
        }
    }

    private async handleStudentLogIn(studentEmail: string) {
        try {
            let releasementList: IReleasement[] = [];
            let selectionList: ISelection[] = []; // use empty list for default
            const responseOfAllReleasement = await ReleasementAPI.getInstance().getAvailableReleasement();
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
                        });
                    },
                    sendComment: this.sendComment.bind(this),
                    sendCourseSelection: this.sendCourseSelection.bind(this),
                    sendForum: this.sendForum.bind(this),
                    sendSubmission: this.sendSubmission.bind(this)
                }
            });
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
                    {
                        this.state.userType === "admin" && this.state.forAdmin
                        && <AdminSider/>
                    }
                    <Layout>
                        <ContentRouter
                            userType={this.state.userType}
                            forStudent={this.state.forStudent}
                            forTeacher={this.state.forTeacher}
                            forVisitor={this.state.forVisitor}
                            forAdmin={this.state.forAdmin}
                        />
                    </Layout>
                </Layout>
            </Layout>
        );
    }

}

