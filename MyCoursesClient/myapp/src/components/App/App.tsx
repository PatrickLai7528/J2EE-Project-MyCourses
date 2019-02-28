import * as React from "react";
import {Component, Context} from "react";
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
    ISendAssignmentProps, ISendCommentProps,
    ISendCourseReleaseProps, ISendCourseSelectionProps, ISendForumProps, ISendSlideProps,
    UserStateProps
} from "./GeneralProps";
import {ContentRouter} from "../ContentRouter/ContentRouter";
import {SendActionHandler} from "./SendActionHandler";
import {IAppContext} from "../../store/AppContext";

const defaultAppContext: IAppContext = {
    userType: "visitor",
    sendSlide: (data: ISendSlideData, callback?: ISendActionCallback) => {
    },
    sendAddCourse: (data: ISendAddCourseData, callback?: ISendActionCallback) => {
    },
    sendAssignment: (data: ISendAssignmentData, callback?: ISendActionCallback) => {
    },
    sendComment: (data: ISendCommentData, callback?: ISendActionCallback) => {
    },
    sendCourseRelease: (data: ISendReleasementData, callback?: ISendActionCallback) => {
    },
    sendCourseSelection: (data: ISendSelectionData, callback?: ISendActionCallback) => {
    },
    sendForum: (data: ISendForumData, callback?: ISendActionCallback) => {
    },
};

const AppContext: Context<IAppContext> = React.createContext(defaultAppContext);

export const AppContextConsumer = AppContext.Consumer;

interface IAppState extends UserStateProps, ISendSlideProps, ISendAssignmentProps, ISendAddCourseProps, ISendCourseReleaseProps, ISendCourseSelectionProps, ISendForumProps, ISendCommentProps {
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
            releasementListOfTeacher: [],
            sendSlide: (data: ISendSlideData, callback?: ISendActionCallback) => SendActionHandler.sendSlide(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
            sendCourseSelection: (data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email)),
            sendForum: (data: ISendForumData, callback?: ISendActionCallback) => SendActionHandler.sendForum(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
            sendCourseRelease: (data: ISendReleasementData, callback?: ISendActionCallback) => SendActionHandler.sendCourseRelease(data, callback)(() => this.getReleasementOf(this.state.email)),
            sendComment: (data: ISendCommentData, callback?: ISendActionCallback) => SendActionHandler.sendComment(data, callback)(() => {
                this.refreshManagingReleasementByRid(data.rid, () => {
                    this.state.managingReleasement && this.state.managingReleasement.forumEntityList ?
                        this.state.managingReleasement.forumEntityList.forEach((forum: IForum) => {
                            if (forum.fid === data.fid) {
                                this.setDisplayingForum(forum);
                            }
                        }) : "";
                });
            }),
            sendAssignment: (data: ISendAssignmentData, callback?: ISendActionCallback) => SendActionHandler.sendAssignment(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
            sendAddCourse: (data: ISendAddCourseData, callback?: ISendActionCallback) => SendActionHandler.sendAddCourse(data, callback)(() => this.getCourseOf(this.state.email))
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

    private async getCourseOf(teacherEmail: string | undefined) {
        if (!teacherEmail) return;
        try {
            const response: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getCourseOf(teacherEmail);
            if (response.isSuccess && response.payload) this.setState({courseList: response.payload});
        } catch (e) {
            console.log(e);
        }
    }

    private async getSelectionOf(studentEmail: string | undefined) {
        if (!studentEmail) return;
        try {
            const response: IAPIResponse<ISelection[]> = await SelectionAPI.getInstance().getSelectionOf(studentEmail);
            if (response.isSuccess && response.payload) this.setState({selectionList: response.payload})
        } catch (e) {
            console.log(e);
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

    private getReleasementOf(teacherEmail: string | undefined) {
        if (!teacherEmail) return;
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

    private refreshManagingReleasementByRid(rid: number, callback: () => void = () => {
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
        const {releasementListOfStudent} = this.state;
        defaultAppContext.userType = this.state.userType;
        defaultAppContext.sendCourseSelection = (data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email));
        if (this.state.email)
            defaultAppContext.forStudent = {
                email: this.state.email,
                setDisplayingForum: this.setDisplayingForum.bind(this),
                releasementList: releasementListOfStudent
            };
        return (
            <AppContext.Provider value={defaultAppContext}>
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

                                sendAddCourse={(data: ISendAddCourseData, callback?: ISendActionCallback) => SendActionHandler.sendAddCourse(data, callback)(() => this.getCourseOf(this.state.email))}
                                sendCourseRelease={(data: ISendReleasementData, callback?: ISendActionCallback) => SendActionHandler.sendCourseRelease(data, callback)(() => this.getReleasementOf(this.state.email))}
                                sendCourseSelection={(data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email))}
                                sendSlide={(data: ISendSlideData, callback?: ISendActionCallback) => SendActionHandler.sendSlide(data, callback)(() => this.refreshManagingReleasementByRid(data.rid))}
                                sendForum={(data: ISendForumData, callback?: ISendActionCallback) => SendActionHandler.sendForum(data, callback)(() => this.refreshManagingReleasementByRid(data.rid))}
                                sendComment={(data: ISendCommentData, callback?: ISendActionCallback) => SendActionHandler.sendComment(data, callback)(() => {
                                    this.refreshManagingReleasementByRid(data.rid, () => {
                                        this.state.managingReleasement && this.state.managingReleasement.forumEntityList ?
                                            this.state.managingReleasement.forumEntityList.forEach((forum: IForum) => {
                                                if (forum.fid === data.fid) {
                                                    this.setDisplayingForum(forum);
                                                }
                                            }) : "";
                                    });
                                })}
                            />
                        </Layout>
                    </Layout>
                </Layout>
            </AppContext.Provider>
        );
    }
}

