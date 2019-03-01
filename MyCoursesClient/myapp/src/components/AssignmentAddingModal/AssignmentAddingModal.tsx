import * as React from "react";
import {Modal} from "antd";

export interface IAssignmentAddingModalProps {
    visible: boolean
    onOk: () => void
    onCancel: () => void
    confirmLoading: boolean

    children?: any
}

export const AssignmentAddingModal: React.FunctionComponent<IAssignmentAddingModalProps> = (props: IAssignmentAddingModalProps) => {
    return (
        <Modal align={undefined}
               title={"發佈作業"}
               destroyOnClose={true}
               visible={props.visible}
               onOk={props.onOk}
               onCancel={props.onCancel}
               confirmLoading={props.confirmLoading}
        >
            {props.children}
        </Modal>
    )
};