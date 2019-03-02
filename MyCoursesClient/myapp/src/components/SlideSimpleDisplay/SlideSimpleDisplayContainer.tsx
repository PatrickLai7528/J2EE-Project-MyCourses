import * as React from "react";
import {SlideSimpleDisplay} from "./SlideSimpleDisplay";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {ISlide} from "../../types/entities";
import {Button} from "antd";
import {SlideAddingModal} from "../SlideAddingModal/SlideAddingModal";
import {SlideAddingFormContainer} from "../SlideAddingForm/SlideAddingFormContainer";
import {ISendActionCallback} from "../App/GeneralProps";
import {ISendSlideData} from "../../api/SlideAPI";

export interface ISlideDisplayContainerProps {
    userType: UserType
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
}

interface ISlideDisplayContainerState {
    modalVisible: boolean
    submitForm: boolean
    confirmLoading: boolean
}

export class SlideSimpleDisplayContainer extends React.Component<ISlideDisplayContainerProps, ISlideDisplayContainerState> {
    public constructor(props: ISlideDisplayContainerProps) {
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
                <SlideSimpleDisplay slideList={this.getSlideList()} addSlideButton={this.getAddSlideButton()}/>
                <SlideAddingModal
                    visible={this.state.modalVisible}
                    onOk={() => this.setState({submitForm: true})}
                    onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                    confirmLoading={this.state.confirmLoading}
                >
                    <SlideAddingFormContainer
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
                        sendSlide={this.getSendSlide()}
                    />
                </SlideAddingModal>
            </div>
        )
    }

    private getSlideList(): ISlide[] {
        console.log(this.props);
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "student" && forStudent && forStudent.displayingSelection && forStudent.displayingSelection.releasementEntity) {
            if (forStudent.displayingSelection.releasementEntity.slideEntityList)
                return forStudent.displayingSelection.releasementEntity.slideEntityList;
            else return []
        }

        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            if (forTeacher.managingReleasement.slideEntityList)
                return forTeacher.managingReleasement.slideEntityList;
            else return []
        }

        throw new Error();
    }

    private getAddSlideButton(): React.ReactNode {
        const {userType, forTeacher} = this.props;
        if (userType === "teacher" && forTeacher)
            return (
                <Button style={{marginBottom: 24}} htmlType={"button"} type={"primary"}
                        onClick={() => this.setState({modalVisible: true})}>上傳課件</Button>
            );

        return null;
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

    private getSendSlide(): (data: ISendSlideData, callback?: ISendActionCallback) => void {
        if (this.props.userType === "teacher" && this.props.forTeacher) {
            return this.props.forTeacher.sendSlide;
        }
        throw new Error();
    }
}