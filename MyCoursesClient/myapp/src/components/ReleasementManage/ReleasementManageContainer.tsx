import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement} from "../../types/entities";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {AssignmentSimpleDisplayContainer} from "../AssignmentSimpleDisplay/AssignmentSimpleDisplayContainer";
import {SlideSimpleDisplayContainer} from "../SlideSimpleDisplay/SlideSimpleDisplayContainer";
import {ForumSimpleDisplayContainer} from "../ForumSimpleDisplay/ForumSimpleDisplayContainer";
import {Divider, Layout} from "antd";
import {ReleasementManageMessage} from "./ReleasementManageMessage";
import {ReleasementOperationForTeacherContainer} from "../ReleasementOperationForTeacher/ReleasementOperationForTeacherContainer";

export interface IReleasementManageContainerProps {
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
    userType: UserType
}

interface IReleasementManageContainerState {
}

export default class ReleasementManageContainer extends React.Component<IReleasementManageContainerProps, IReleasementManageContainerState> {

    public constructor(props: IReleasementManageContainerProps) {
        super(props);
    }


    public render(): React.ReactNode {
        const {userType, forTeacher, forStudent} = this.props;
        let email: string | undefined;
        let releasement: IReleasement | undefined;
        let setDisplayingForum: ((forum: IForum) => void) | undefined;
        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            email = forTeacher.email;
            releasement = forTeacher.managingReleasement;
            setDisplayingForum = forTeacher.setDisplayingForum;
        } else if (userType === "student" && forStudent && forStudent.displayingSelection) { // userType === student
            email = forStudent.email;
            releasement = forStudent.displayingSelection.releasementEntity;
            setDisplayingForum = forStudent.setDisplayingForum;
        }

        if (email && releasement && setDisplayingForum) {
            return (
                <div>
                    <Layout>
                        <Layout.Content>
                            <h1>{releasement.courseEntity.name}</h1>
                            <Divider/>
                            <ReleasementManageMessage userType={userType} forStudent={forStudent} forTeacher={forTeacher}/>
                            <Divider/>
                            <SlideSimpleDisplayContainer
                                userType={userType}
                                forTeacher={forTeacher} forStudent={forStudent}
                            />
                            <Divider/>
                            <AssignmentSimpleDisplayContainer
                                userType={userType} forStudent={forStudent}
                                forTeacher={forTeacher}/>
                            <Divider/>
                        </Layout.Content>
                        <Layout.Sider theme={"light"}
                                      style={{marginTop: 0, margin: 15, padding: 8, background: "#f0f2f5"}} width={250}>
                            {
                                this.showOperation()
                            }
                            <ForumSimpleDisplayContainer userType={userType} forTeacher={forTeacher}
                                                         forStudent={forStudent}/>
                        </Layout.Sider>
                    </Layout>
                </div>
            );
        } else
            return null;
    }

    private showOperation(): React.ReactNode {
        const {userType, forTeacher} = this.props;
        if (userType === "teacher" && forTeacher) {
            return <ReleasementOperationForTeacherContainer userType={userType} forTeacher={forTeacher}/>
        }
    }

}