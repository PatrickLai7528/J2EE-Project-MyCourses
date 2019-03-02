import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {AssignmentSimpleDisplay, IconText} from "./AssignmentSimpleDisplay";
import {IAssignment, IReleasement, ISelection} from "../../types/entities";
import {Button} from "antd";
import {AssignmentAddingModal} from "../AssignmentAddingModal/AssignmentAddingModal";
import {AssignmentAddingFormContainer} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {ISendAssignmentData, ISendSubmissionData} from "../../api/AssignmentAPI";
import {ISendActionCallback, ISendSubmissionProps} from "../App/GeneralProps";
import {AssignmentSubmitFormContainer} from "../AssignmentSubmitForm/AssignmentSubmitFormContainer";

export interface IAssignmentDisplayContainerProps {
    userType: UserType
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
}

interface IAssignmentDisplayContainerState {
    modalVisible: boolean
    confirmLoading: boolean
    submitForm: boolean
    submittingAssignment?: IAssignment
    form: AssignmentModalForm
}

type AssignmentModalForm = "SUBMIT" | "UPLOAD"


export class AssignmentSimpleDisplayContainer extends React.Component<IAssignmentDisplayContainerProps, IAssignmentDisplayContainerState> {

    public constructor(props: IAssignmentDisplayContainerProps) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false,
            submitForm: false,
            form: "UPLOAD"
        }
    }


    private getAssignmentList(): IAssignment[] {
        if (this.props.userType === "teacher" && this.props.forTeacher && this.props.forTeacher.managingReleasement) {
            if (this.props.forTeacher.managingReleasement.assignmentEntityList)
                return this.props.forTeacher.managingReleasement.assignmentEntityList;
            else return []
        }

        if (this.props.userType === "student" && this.props.forStudent && this.props.forStudent.displayingSelection) {
            if (this.props.forStudent.displayingSelection.releasementEntity.assignmentEntityList)
                return this.props.forStudent.displayingSelection.releasementEntity.assignmentEntityList;
            else return []
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
                <AssignmentSimpleDisplay assignmentList={this.getAssignmentList()}
                                         addAssignmentButton={this.getAddAssignmentButton()}
                                         submitAssignmentButtonList={this.getSubmitAssignmentButtonList()}
                />
                <AssignmentAddingModal
                    title={this.getModalTitle()}
                    visible={this.state.modalVisible}
                    onOk={() => this.setState({submitForm: true})}
                    onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                    confirmLoading={this.state.confirmLoading}
                >
                    {
                        this.state.form === "SUBMIT" ?
                            <AssignmentSubmitFormContainer
                                email={this.getEmail()}
                                isTimeToSubmit={this.state.submitForm}
                                selection={this.getSelection()}
                                assignment={this.getAssignment()}
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
                                sendSubmission={this.getSendSubmission()}
                            />
                            :
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
                                sendAssignment={this.getSendAssignment()}
                            />
                    }
                </AssignmentAddingModal>
            </div>
        )
    }

    private getSendAssignment(): (data: ISendAssignmentData, callback?: ISendActionCallback) => void {
        if (this.props.userType === "teacher" && this.props.forTeacher) {
            return this.props.forTeacher.sendAssignment;
        }
        return () => {
        }
    }

    private getSubmitAssignmentButtonList(): React.ReactNode[] {
        if (this.props.userType === "student" && this.props.forStudent) {
            const assignmentList: IAssignment[] = this.getAssignmentList();
            let ret: React.ReactNode[] = [];
            for (let assignment of assignmentList) {
                ret[assignment.assid] = (
                    <a onClick={() => {
                        this.setState({modalVisible: true, form: "SUBMIT", submittingAssignment: assignment})
                    }}><IconText type={"upload"} text={"提交作業"}/></a>
                )
            }
            return ret;
        } else return []
    }

    private getSendSubmission(): (data: ISendSubmissionData, callback?: ISendActionCallback) => void {
        const {userType, forStudent} = this.props;
        if (userType === "student" && forStudent) {
            return forStudent.sendSubmission;
        }

        return () => {
        }
    }

    private getModalTitle(): string {
        if (this.state.form === "UPLOAD")
            return "發佈作業";
        else // submit
            return "上傳作業";
    }

    private getAssignment(): IAssignment {
        let ret: IAssignment | undefined = this.state.submittingAssignment;
        if (ret)
            return ret;
        throw new Error();
    }

    private getSelection():ISelection {
        const {userType, forStudent} = this.props;
        if(userType === "student" && forStudent && forStudent.displayingSelection)
            return forStudent.displayingSelection;

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