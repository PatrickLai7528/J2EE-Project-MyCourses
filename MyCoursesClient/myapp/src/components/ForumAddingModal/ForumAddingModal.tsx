import * as React from "react";
import {Modal} from "antd";

export interface IForumAddingModalProps {
    visible: boolean
    onOk: () => void
    onCancel: () => void
    confirmLoading: boolean

    children?: any
}

export const ForumAddingModal: React.FunctionComponent<IForumAddingModalProps> = (props: IForumAddingModalProps) => {
    return (
        <Modal align={undefined}
               title={"創建討論區"}
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