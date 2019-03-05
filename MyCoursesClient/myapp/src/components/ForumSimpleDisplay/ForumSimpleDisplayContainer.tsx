import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {ForumSimpleDisplay} from "./ForumSimpleDisplay";
import {IForum} from "../../types/entities";
import {ForumAddingModal} from "../ForumAddingModal/ForumAddingModal";
import {ForumAddingFormContainer} from "../ForumAddingForm/ForumAddingFormContainer";
import {ISendActionCallback} from "../App/SendActionProps";
import {ISendForumData} from "../../api/ForumAPI";

export interface IForumSimpleDisplayContainerProps {
    userType: UserType
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
}

interface IForumSimpleDisplayContainerState {
    modalVisible: boolean
    submitForm: boolean
    confirmLoading: boolean
}

export class ForumSimpleDisplayContainer extends React.Component<IForumSimpleDisplayContainerProps, IForumSimpleDisplayContainerState> {
    public constructor(props: IForumSimpleDisplayContainerProps) {
        super(props);
        this.state = {
            modalVisible: false,
            submitForm: false,
            confirmLoading: false
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <ForumSimpleDisplay
                    addForumButton={this.getAddForumButton()}
                    forumList={this.getForumList()}
                    setDisplayingForum={this.getSetDisplayingForum()}
                />
                <ForumAddingModal
                    visible={this.state.modalVisible}
                    onOk={() => {
                        this.setState({submitForm: true})
                    }}
                    onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                    confirmLoading={this.state.confirmLoading}
                >
                    <ForumAddingFormContainer
                        email={this.getEmail()}
                        userType={this.props.userType}
                        isTimeToSubmit={this.state.submitForm}
                        releasement={this.getReleasement()}
                        onSendBefore={() => this.setState({submitForm: false, confirmLoading: true})}
                        onSendSuccess={() => this.setState({
                            submitForm: false,
                            modalVisible: false,
                            confirmLoading: false
                        })}
                        onSendFail={() => this.setState({
                            submitForm: false,
                            modalVisible: false,
                            confirmLoading: false
                        })}
                        onSendError={() => this.setState({
                            submitForm: false,
                            modalVisible: false,
                            confirmLoading: false
                        })}
                        sendForum={this.getSendForum()}
                    />
                </ForumAddingModal>
            </div>
        )
    }

    private getReleasement() {
        if (this.props.userType === "teacher" && this.props.forTeacher && this.props.forTeacher.managingReleasement) {
            return this.props.forTeacher.managingReleasement
        }

        if (this.props.userType === "student" && this.props.forStudent && this.props.forStudent.displayingSelection) {
            return this.props.forStudent.displayingSelection.releasementEntity;
        }

        throw new Error();
    }

    private getAddForumButton() {
        return (
            <a onClick={() => this.setState({modalVisible: true})}> 發起討論 </a>
        )
    }

    private getForumList(): IForum[] {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            if (forTeacher.managingReleasement.forumEntityList)
                return forTeacher.managingReleasement.forumEntityList;
            else return []
        }
        if (userType === "student" && forStudent && forStudent.displayingSelection && forStudent.displayingSelection.releasementEntity) {
            if (forStudent.displayingSelection.releasementEntity.forumEntityList)
                return forStudent.displayingSelection.releasementEntity.forumEntityList;
            else return []
        }
        throw new Error();
    }

    private getSetDisplayingForum(): (forum: IForum) => void {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "teacher" && forTeacher) {
            return forTeacher.setDisplayingForum
        }
        if (userType === "student" && forStudent) {
            return forStudent.setDisplayingForum
        }
        throw new Error();
    }

    private getSendForum(): (data: ISendForumData, callback?: ISendActionCallback) => void {
        if (this.props.userType === "teacher" && this.props.forTeacher) {
            return this.props.forTeacher.sendForum;
        }
        if (this.props.userType === "student" && this.props.forStudent) {
            return this.props.forStudent.sendForum;
        }
        throw new Error();
    }

    private getEmail() {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "student" && forStudent)
            return forStudent.email;
        if (userType === "teacher" && forTeacher)
            return forTeacher.email;
        throw new Error();
    }
}