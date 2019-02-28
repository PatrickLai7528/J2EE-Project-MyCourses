import * as React from "react";
import {Icon, Input, Modal} from "antd";
import {AssignmentAddingFormContainer} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {IReleasement} from "../../types/entities";
import {SlideAddingFormContainer} from "../SlideAddingForm/SlideAddingFormContainer";
import {ISendSlideData} from "../../api/SlideAPI";
import {ForumAddingFormContainer} from "../ForumAddingForm/ForumAddingFormContainer";
import {ISendForumData} from "../../api/ForumAPI";
import {UserType} from "../../api/UserAPI";
import {ISendAssignmentProps, ISendForumProps, ISendSlideProps, UserStateProps} from "../App/GeneralProps";

export enum FormOption {
    ASSIGNMENT, SLIDE, FORUM, SUMBIT_ASSIGNMENT
}

export interface IGeneralAddingModalProps extends UserStateProps, ISendAssignmentProps, ISendSlideProps, ISendForumProps {
    mode: FormOption

    releasement: IReleasement
    visible: boolean
    onOk: () => void
    onCancel: () => void
    confirmLoading: boolean

    isTimeToSubmitAssignment: boolean
    isTimeToSubmitSlide: boolean
    isTimeToSubmitForum: boolean
    refreshFormTrigger: boolean

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void
}

export const GeneralAddingModal: React.FunctionComponent<IGeneralAddingModalProps> = (props: IGeneralAddingModalProps) => {
    console.log(props);
    return (
        <Modal
            title={
                props.mode === FormOption.ASSIGNMENT ? "發佈作業" :
                    props.mode === FormOption.SLIDE ? "上傳課件" :
                        props.mode === FormOption.FORUM ? "發起討論" : ""
            }
            visible={props.visible}
            onOk={props.onOk}
            confirmLoading={props.confirmLoading}
            onCancel={props.onCancel}
            maskClosable={true}
            okText="確定"
            cancelText="取消"
        >
            {
                props.mode === FormOption.ASSIGNMENT ?
                    <AssignmentAddingFormContainer
                        refreshFormTrigger={props.refreshFormTrigger}
                        releasement={props.releasement}
                        isTimeToSubmit={props.isTimeToSubmitAssignment}
                        sendAssignment={props.sendAssignment}
                        onSendBefore={props.onSendBefore}
                        onSendError={props.onSendFail}
                        onSendSuccess={props.onSendSuccess}
                        onSendFail={props.onSendFail}
                    /> : ""
            }
            {
                props.mode === FormOption.SLIDE ?
                    <SlideAddingFormContainer
                        sendSlide={props.sendSlide}
                        refreshFormTrigger={props.refreshFormTrigger}
                        releasement={props.releasement}
                        isTimeToSubmit={props.isTimeToSubmitSlide}
                        onSendBefore={props.onSendBefore}
                        onSendError={props.onSendError}
                        onSendSuccess={props.onSendSuccess}
                        onSendFail={props.onSendFail}
                    /> : ""
            }
            {
                props.mode === FormOption.FORUM ?
                    <ForumAddingFormContainer
                        userType={props.userType}
                        email={props.email}
                        sendForum={props.sendForum}
                        isTimeToSubmit={props.isTimeToSubmitForum}
                        releasement={props.releasement}
                        onSendBefore={props.onSendBefore}
                        onSendSuccess={props.onSendSuccess}
                        onSendFail={props.onSendFail}
                        onSendError={props.onSendError}
                        refreshFormTrigger={props.refreshFormTrigger}/> : ""
            }
        </Modal>
    )
};