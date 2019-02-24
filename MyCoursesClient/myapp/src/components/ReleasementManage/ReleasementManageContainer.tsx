import * as React from "react";
import {ReleasementManage} from "./ReleasementManage";
import {UserType} from "../../api/UserAPI";
import {IReleasement} from "../../types/entities";
import {FormOption, GeneralAddingModal} from "../GeneralAddingModal/GeneralAddingModal";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {message} from "antd";

export interface IReleasementManageContainerProps {
    userType: UserType
    email?: string
    releasement?: IReleasement

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void


}

interface IReleasementManageContainerState {
    generalModalMode:FormOption
    generalModalVisible: boolean
    generalModalConfirmLoading: boolean
    isTimeToSubmit: boolean
    refreshFormTrigger: boolean
}

export default class ReleasementManageContainer extends React.Component<IReleasementManageContainerProps, IReleasementManageContainerState> {

    public constructor(props: IReleasementManageContainerProps) {
        super(props);
        this.state = {
            generalModalMode: FormOption.ASSIGNMENT,
            generalModalConfirmLoading: false,
            generalModalVisible: false,
            isTimeToSubmit: false,
            refreshFormTrigger: false
        }
    }

    private enableAssignmentAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode:FormOption.ASSIGNMENT});
    }


    private enableSlideAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode:FormOption.SLIDE});
    }

    public render(): React.ReactNode {
        if (this.props.email && this.props.releasement)
            return (
                <div>
                    <ReleasementManage
                        editable={this.props.userType === "teacher"}
                        releasement={this.props.releasement}
                        onAssignmentClick={this.enableAssignmentAddingForm.bind(this)}
                        onSlideClick={this.enableSlideAddingForm.bind(this)}
                    />
                    <GeneralAddingModal
                        mode={this.state.generalModalMode}
                        refreshFormTrigger={this.state.refreshFormTrigger}
                        releasement={this.props.releasement}
                        sendAssignment={this.props.sendAssignment}
                        confirmLoading={this.state.generalModalConfirmLoading}
                        visible={this.state.generalModalVisible}

                        // this is the trigger to submit the form submit
                        isTimeToSubmit={this.state.isTimeToSubmit}

                        onOk={() => {
                            // to trigger the form submit
                            this.setState({
                                isTimeToSubmit: true
                            })
                        }}

                        onCancel={() => {
                            this.setState({
                                generalModalVisible: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            })
                        }}

                        onSendBefore={() => {
                            this.setState({isTimeToSubmit: false, generalModalConfirmLoading: true})
                        }}

                        onSendSuccess={(response: IAPIResponse<any>) => {
                            this.setState({
                                isTimeToSubmit: false,
                                generalModalVisible: false,
                                generalModalConfirmLoading: false
                            });
                            message.success(response.message);
                        }}

                        onSendFail={(response: IAPIResponse<any>) => {
                            this.setState({
                                isTimeToSubmit: false,
                                generalModalVisible: false,
                                generalModalConfirmLoading: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            });
                            message.success(response.message);
                        }}

                        onSendError={(e: any) => {
                            console.log(e);
                            this.setState({
                                isTimeToSubmit: false,
                                generalModalVisible: false,
                                generalModalConfirmLoading: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            });
                            message.error("發生未知錯誤，請稍候再試")
                        }}
                    />
                </div>
            );
        else
            return null;
    }
}