import * as React from "react";
import {Component, Context} from "react";
import './App.css';
import {Layout, message} from 'antd';

import StudentSider from "../StudentSider/StudentSider";
import MyHeader from "./../MyHeader/MyHeader";
import {UserType} from "../../api/UserAPI";
import CourseAPI from "../../api/CourseAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ICourse, IForum, IReleasement} from "../../types/entities";
import ReleasementAPI from "../../api/ReleasementAPI";
import Cookies from "universal-cookie/es6";
import {TeacherSider} from "../TeacherSider/TeacherSider";
import {ContentRouter} from "../ContentRouter/ContentRouter";
import {defaultAppContext, IAppContext} from "../../store/AppContext";
import {StudentReducer} from "../../reducers/StudentReducer";

const AppContext: Context<IAppContext> = React.createContext(defaultAppContext);

export const AppContextConsumer = AppContext.Consumer;

interface IAppState {
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
    context: IAppContext
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
            context: StudentReducer.appStart(defaultAppContext, {
                releasementList: [],
                superRefresh: newContext => this.setState({context: newContext})
                // onLogInSuccess: this.handleLogInSuccess.bind(this),
                // onLogInFail: this.handleLogInFail.bind(this),
                // onLogInError: this.handleLogInError.bind(this),
                // onSignUpSuccess: this.handleSignUpSuccess.bind(this),
                // onSignUpFail: this.handleSignUpFail.bind(this),
                // onSignUpError: this.handleSignUpError.bind(this)
            })
        }
        // this.state = {
        //     userType: "visitor",
        //     email: undefined,
        //     selectionList: [],
        //     courseList: [],
        //     releasementListOfStudent: [],
        //     releasementListOfTeacher: [],
        //     sendSlide: (data: ISendSlideData, callback?: ISendActionCallback) => SendActionHandler.sendSlide(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
        //     sendCourseSelection: (data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email)),
        //     sendForum: (data: ISendForumData, callback?: ISendActionCallback) => SendActionHandler.sendForum(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
        //     sendCourseRelease: (data: ISendReleasementData, callback?: ISendActionCallback) => SendActionHandler.sendCourseRelease(data, callback)(() => this.getReleasementOf(this.state.email)),
        //     sendComment: (data: ISendCommentData, callback?: ISendActionCallback) => SendActionHandler.sendComment(data, callback)(() => {
        //         this.refreshManagingReleasementByRid(data.rid, () => {
        //             this.state.managingReleasement && this.state.managingReleasement.forumEntityList ?
        //                 this.state.managingReleasement.forumEntityList.forEach((forum: IForum) => {
        //                     if (forum.fid === data.fid) {
        //                         this.setDisplayingForum(forum);
        //                     }
        //                 }) : "";
        //         });
        //     }),
        //     sendAssignment: (data: ISendAssignmentData, callback?: ISendActionCallback) => SendActionHandler.sendAssignment(data, callback)(() => this.refreshManagingReleasementByRid(data.rid)),
        //     sendAddCourse: (data: ISendAddCourseData, callback?: ISendActionCallback) => SendActionHandler.sendAddCourse(data, callback)(() => this.getCourseOf(this.state.email))
        // }
    }

    public componentWillMount(): void {
        const cookie: Cookies = new Cookies();
        // console.log(cookie);
        const token: string = cookie.get("token");
        const userType: UserType = cookie.get("userType");
        const email: string = cookie.get("email");
        if (token && userType !== "visitor" && email) {
            // already logged in and data stored in cookies
            this.stillLogIn(userType, email, token);
        }

        // this.getAllReleasement();
    }

    private setDisplayingForum(forum: IForum): void {
        // this.setState({displayingForum: forum})
    }

    private async getCourseOf(teacherEmail: string | undefined): Promise<ICourse[] | undefined> {
        if (!teacherEmail) return;
        try {
            const response: IAPIResponse<ICourse[]> = await CourseAPI.getInstance().getCourseOf(teacherEmail);
            if (response.isSuccess && response.payload)
                return response.payload;
            return undefined;
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    // private async getSelectionOf(studentEmail: string | undefined) {
    //     if (!studentEmail) return;
    //     try {
    //         const response: IAPIResponse<ISelection[]> = await SelectionAPI.getInstance().getSelectionOf(studentEmail);
    //         if (response.isSuccess && response.payload) this.setState({selectionList: response.payload})
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    public async getAllReleasement(): Promise<IReleasement[] | undefined> {
        try {
            const response: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getAllReleasement();
            if (response.isSuccess && response.payload)
                return response.payload;
            else
                message.error(response.message);
            return undefined;
        } catch (e) {
            console.log(e);
            return undefined;
        }
        // ReleasementAPI.getInstance().getAllReleasement()
        //     .then((response: IAPIResponse<IReleasement[]>) => {
        //         if (response.isSuccess) {
        //             if (response.payload)
        //                 this.setState({releasementListOfStudent: response.payload})
        //         } else {
        //             message.error(response.message);
        //         }
        //     })
        //     .catch((e: any) => {
        //         console.log(e);
        //         message.error("發生未知錯誤，請稍候再試");
        //     })
    }

    private async getReleasementOf(teacherEmail: string | undefined): Promise<IReleasement[] | undefined> {
        if (!teacherEmail) return;
        try {
            const response: IAPIResponse<IReleasement[]> = await ReleasementAPI.getInstance().getReleasementOf(teacherEmail);
            if (response.isSuccess && response.payload)
                return response.payload;
            return undefined;
        } catch (e) {
            console.log(e);
            return undefined;
        }
        // ReleasementAPI.getInstance().getReleasementOf(teacherEmail)
        //     .then((response: IAPIResponse<IReleasement[]>) => {
        //         if (response.isSuccess) {
        //             if (response.payload)
        //                 this.setState({releasementListOfTeacher: response.payload})
        //         } else {
        //             message.error(response.message);
        //         }
        //     })
        //     .catch((e: any) => {
        //         console.log(e);
        //         message.error("發生未知錯誤，請稍候再試");
        //     })
    }

    // private refreshManagingReleasementByRid(rid: number, callback: () => void = () => {
    // }): void {
    //     ReleasementAPI.getInstance().getReleasementByRid(rid)
    //         .then((response: IAPIResponse<IReleasement>) => {
    //             if (response.isSuccess) {
    //                 this.setState({managingReleasement: response.payload});
    //                 callback();
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

    // private handleSelectionClickFromStudentSider(selection: ISelection): void {
    //     //     this.setState({displayingSelection: selection})
    //     // }

    private async stillLogIn(userType:UserType, email:string, token:string) {
        const cookie: Cookies = new Cookies();

        // cookie may left before, clear first
        cookie.remove("token");
        cookie.remove("userType");
        cookie.remove("email");

        cookie.set("token", token);
        cookie.set("userType", userType);
        cookie.set("email", email);
        if (userType === "student") {
            const releasementList: IReleasement[] | undefined = await this.getAllReleasement();
            if (releasementList)
                this.setState({
                    context: StudentReducer.studentLogInSuccess(this.state.context, {
                        email, releasementList
                    })
                })
        } else if (userType === "teacher") {
            const releasementList: IReleasement[] | undefined = await this.getReleasementOf(email);
            const courseList: ICourse[] | undefined = await this.getCourseOf(email);
            if (releasementList && courseList)
                this.setState({
                    context: StudentReducer.teacherLogIn(this.state.context, {
                        email, releasementList, courseList, setDisplayingForum: this.setDisplayingForum.bind(this)
                    })
                })
        }
    }

    private switchSiderDependOnUserType(userType: UserType): React.ReactNode {
        switch (userType) {
            case "student":
            case "visitor":
                return <StudentSider/>;
            case "teacher":
                return <TeacherSider/>;
        }
    }

    public render(): React.ReactNode {
        // const {releasementListOfStudent} = this.state;
        // defaultAppContext.userType = this.state.userType;
        // defaultAppContext.sendCourseSelection = (data: ISendSelectionData, callback?: ISendActionCallback) => SendActionHandler.sendCourseSelection(data, callback)(() => this.getSelectionOf(this.state.email));
        // if (this.state.email)
        //     defaultAppContext.forStudent = {
        //         email: this.state.email,
        //         setDisplayingForum: this.setDisplayingForum.bind(this),
        //         releasementList: releasementListOfStudent
        //     };
        return (
            <AppContext.Provider value={this.state.context}>
                <Layout>
                    <MyHeader/>
                    <Layout>
                        {this.switchSiderDependOnUserType(this.state.context.userType)}
                        <Layout>
                            <ContentRouter/>
                        </Layout>
                    </Layout>
                </Layout>
            </AppContext.Provider>
        );
    }
}

