import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {ReleasementOperationForTeacher} from "./ReleasementOperationForTeacher";
import {Modal} from "antd";
import {ForumAddingModal} from "../ForumAddingModal/ForumAddingModal";

export interface IReleasementOperationForTeacherContainerProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IReleasementOperationForTeacherContainerState {
    modalVisible: boolean
    confirmLoading: boolean
    submitForm:boolean
}

export class ReleasementOperationForTeacherContainer extends React.Component<IReleasementOperationForTeacherContainerProps, IReleasementOperationForTeacherContainerState> {

    public constructor(props:IReleasementOperationForTeacherContainerProps){
        super(props);
        this.state  = {
            modalVisible:false,
            confirmLoading:false,
            submitForm:false
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
            <ReleasementOperationForTeacher/>
            <Modal align={undefined}
                   destroyOnClose={true}
                   visible={this.state.modalVisible}
                   onOk={() => {
                       this.setState({submitForm: true})
                   }}
                   onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                   confirmLoading={this.state.confirmLoading}
            />
            </div>
        )
    }
}