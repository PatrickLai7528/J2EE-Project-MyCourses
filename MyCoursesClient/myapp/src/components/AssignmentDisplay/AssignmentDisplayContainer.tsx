import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {AssignmentDisplay} from "./AssignmentDisplay";
import {IAssignment, IReleasement} from "../../types/entities";
import {Button} from "antd";
import {AssignmentAddingModal} from "../AssignmentAddingModal/AssignmentAddingModal";
import {AssignmentSubmitFormContainer} from "../AssignmentSubmitForm/AssignmentSubmitFormContainer";
import {AssignmentAddingFormContainer} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {ISendActionCallback} from "../App/GeneralProps";

export interface IAssignmentDisplayContainerProps {
    userType: UserType
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
}

interface IAssignmentDisplayContainerState {
    modalVisible: boolean
    confirmLoading: boolean
    submitForm: boolean
}

export class AssignmentDisplayContainer extends React.Component<IAssignmentDisplayContainerProps, IAssignmentDisplayContainerState> {

    public constructor(props: IAssignmentDisplayContainerProps) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false,
            submitForm: false
        }
    }


    private getAssignmentFrom(): IAssignment[] {
        if (this.props.userType === "teacher" && this.props.forTeacher && this.props.forTeacher.managingReleasement) {
            if (this.props.forTeacher.managingReleasement.assignmentEntityList)
                return this.props.forTeacher.managingReleasement.assignmentEntityList;
            else return []
        }

        if (this.props.userType === "student" && this.props.forStudent && this.props.forStudent.displayingSelection) {
            if (this.props.forStudent.displayingSelection.releasementEntity.assignmentEntityList)
                return this.props.forStudent.displayingSelection.releasementEntity.assignmentEntityList;
            return []
        }
        // others type
        return []
    }

    private getAddAssignmentButton(): React.ReactNode {
        if (this.props.userType === "teacher" && this.props.forTeacher)
            return (
                <Button style={{marginBottom: 24}} htmlType={"button"} type={"primary"}
                        onClick={() => this.setState({modalVisible: true})}>發佈作業</Button>)
        return null;
    }

    private getReleasement(): IReleasement {
        if (this.props.userType === "teacher" && this.props.forTeacher && this.props.forTeacher.managingReleasement) {
            return this.props.forTeacher.managingReleasement
        }

        if (this.props.userType === "student" && this.props.forStudent && this.props.forStudent.displayingSelection) {
            return this.props.forStudent.displayingSelection.releasementEntity;
        }

        throw new Error();
    }

    public render(): React.ReactNode {
        return (
            <div>
                <AssignmentDisplay assignmentList={this.getAssignmentFrom()}
                                   addAssignmentButton={this.getAddAssignmentButton()}/>
                <AssignmentAddingModal
                    visible={this.state.modalVisible}
                    onOk={() => this.setState({submitForm: true})}
                    onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                    confirmLoading={this.state.confirmLoading}
                >
                    <AssignmentAddingFormContainer
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
                        sendAssignment={this.getSendAssignment()}/>
                </AssignmentAddingModal>
            </div>
        )
    }

    private getSendAssignment(): (data: ISendAssignmentData, callback?: ISendActionCallback) => void {
        if (this.props.userType === "teacher" && this.props.forTeacher) {
            return this.props.forTeacher.sendAssignment;
        }
        throw new Error();
    }
}