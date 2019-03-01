import * as React from "react";
import {Modal} from "antd";

export interface ISlideAddingModalProps {
    visible: boolean
    onOk: () => void
    onCancel: () => void
    confirmLoading: boolean

    children?: any
}

export const SlideAddingModal: React.FunctionComponent<ISlideAddingModalProps> = (props: ISlideAddingModalProps) => {
    return (
        <Modal align={undefined}
               title={"上傳課件"}
               destroyOnClose={true}
               visible={props.visible}
               onOk={props.onOk}
               onCancel={props.onCancel}
               confirmLoading={props.confirmLoading}
        >
            {props.children}
        </Modal>
    )

}