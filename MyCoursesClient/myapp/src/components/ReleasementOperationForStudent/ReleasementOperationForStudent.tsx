import * as React from "react";
import {Card, Col, Row, Modal, message} from "antd";
import {IconText} from "../IconText/IconText";
import SelectionAPI, {ISendSelectionDropData} from "../../api/SelectionAPI";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState} from "../App/App";
import {ISelection} from "../../types/entities";
import {ISendActionCallback} from "../App/SendActionProps";
import IAPIResponse from "../../api/IAPIResponse";
import {Redirect} from "react-router";

export interface IReleasementOperationForStudentProps {
    userType: UserType
    forStudent: IAppForStudentState
}

interface IReleasementOperationForStudentState {
}

export class ReleasementOperationForStudent extends React.Component<IReleasementOperationForStudentProps, IReleasementOperationForStudentState> {
    public render(): React.ReactNode {
        return (
            <div>
                <Card title={"操作"} style={{borderRadius: 10, marginBottom: 15}}>
                    <a onClick={() => {
                        return this.handleDrop();
                    }}>
                        <IconText text={"退課"}
                                  type={"user-delete"}/>
                    </a>
                </Card>
            </div>
        )
    }

    private handleDrop(): void {
        const getEmail = (): string => {
            return this.props.forStudent.email;
        };

        const getSelection = (): ISelection => {
            if (this.props.forStudent.displayingSelection)
                return this.props.forStudent.displayingSelection;
            throw new Error();
        };

        const sendSelectionDrop = this.props.forStudent.sendSelectionDrop;


        Modal.confirm({
            title: '警告',
            content: '退課操作不可復原，確定退課？',
            onOk() {
                sendSelectionDrop({studentEmail: getEmail(), slid: getSelection().slid}, {
                    onBefore: () => {
                    },
                    onSuccess: (response: IAPIResponse<ISelection[]>) => {
                        message.success(response.message);
                    },
                    onFail: (response: IAPIResponse<ISelection[]>) => message.error(response.message),
                    onError: () => message.error("發生未知錯誤、請稍候再試")
                })
            },
            onCancel() {
            },
        })
    }

}