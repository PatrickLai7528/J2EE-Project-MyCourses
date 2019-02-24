import * as React from "react";
import {Icon, Input, Modal} from "antd";
import {AssignmentAddingFormContainer} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {IReleasement} from "../../types/entities";

export enum FormOption {
    ASSIGNMENT, SLIDE
}

export interface IGeneralAddingModalProps {
    mode: FormOption
    title: string
    releasement: IReleasement
    visible: boolean
    onOk: () => void
    onCancel: () => void
    confirmLoading: boolean
    isTimeToSubmit: boolean

    refreshFormTrigger: boolean

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void
}

export const GeneralAddingModal: React.FunctionComponent<IGeneralAddingModalProps> = (props: IGeneralAddingModalProps) => {
    console.log(props);
    return (
        <Modal
            title={props.title}
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
                        isTimeToSubmit={props.isTimeToSubmit}
                        sendAssignment={props.sendAssignment}
                        onSendBefore={props.onSendBefore}
                        onSendError={props.onSendFail}
                        onSendSuccess={props.onSendSuccess}
                        onSendFail={props.onSendFail}
                    /> : ""
            }
        </Modal>
    )
};