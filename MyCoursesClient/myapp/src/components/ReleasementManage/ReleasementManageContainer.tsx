import * as React from "react";
import {ReleasementManage} from "./ReleasementManage";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement} from "../../types/entities";
import {FormOption, GeneralAddingModal} from "../GeneralAddingModal/GeneralAddingModal";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {message} from "antd";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendForumData} from "../../api/ForumAPI";
import {UserStateProps} from "../App/GeneralProps";

export interface IReleasementManageContainerProps extends UserStateProps {
    userType: UserType
    email?: string
    releasement: IReleasement
    setDisplayingForum: (forum: IForum) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment?: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendSlide?: (data: ISendSlideData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendForum?: (data: ISendForumData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

}

interface IReleasementManageContainerState {
    generalModalMode: FormOption
    generalModalVisible: boolean
    generalModalConfirmLoading: boolean


    isTimeToSubmitAssignment: boolean
    isTimeToSubmitSlide: boolean
    isTimeToSubmitForum: boolean

    refreshFormTrigger: boolean
}

export default class ReleasementManageContainer extends React.Component<IReleasementManageContainerProps, IReleasementManageContainerState> {

    public constructor(props: IReleasementManageContainerProps) {
        super(props);
        this.state = {
            generalModalMode: FormOption.ASSIGNMENT,
            generalModalConfirmLoading: false,
            generalModalVisible: false,
            isTimeToSubmitAssignment: false,
            isTimeToSubmitSlide: false,
            isTimeToSubmitForum: false,
            refreshFormTrigger: false
        }
    }

    private enableAssignmentAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.ASSIGNMENT});
    }


    private enableSlideAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.SLIDE});
    }

    private enableForumAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.FORUM});
    }

    public render(): React.ReactNode {
        console.log(" find me")
        console.log(this.props);
        if (this.props.email && this.props.releasement) {
            console.log("fuck you");
            return (
                <div>
                    <ReleasementManage
                        editable={this.props.userType === "teacher"}
                        releasement={this.props.releasement}
                        onAssignmentClick={this.enableAssignmentAddingForm.bind(this)}
                        onSlideClick={this.enableSlideAddingForm.bind(this)}
                        onForumClick={this.enableForumAddingForm.bind(this)}

                        setDisplayingForum={this.props.setDisplayingForum}
                    />
                    <GeneralAddingModal
                        userType={this.props.userType}
                        email={this.props.email}

                        mode={this.state.generalModalMode}
                        refreshFormTrigger={this.state.refreshFormTrigger}
                        releasement={this.props.releasement}

                        sendAssignment={this.props.sendAssignment ? this.props.sendAssignment : () => {
                        }}
                        sendSlide={this.props.sendSlide ? this.props.sendSlide : () => {
                        }}
                        sendForum={this.props.sendForum ? this.props.sendForum : () => {
                        }}

                        confirmLoading={this.state.generalModalConfirmLoading}
                        visible={this.state.generalModalVisible}

                        // these are the trigger to submit the form submit
                        isTimeToSubmitAssignment={this.state.isTimeToSubmitAssignment}
                        isTimeToSubmitSlide={this.state.isTimeToSubmitSlide}
                        isTimeToSubmitForum={this.state.isTimeToSubmitForum}

                        onOk={() => {
                            // to trigger the form submit
                            switch (this.state.generalModalMode) {
                                case FormOption.ASSIGNMENT:
                                    this.setState({isTimeToSubmitAssignment: true});
                                    break;
                                case FormOption.SLIDE:
                                    this.setState({isTimeToSubmitSlide: true});
                                    break;
                                case FormOption.FORUM:
                                    this.setState({isTimeToSubmitForum: true});
                                    break;
                            }
                        }}

                        onCancel={() => {
                            this.setState({
                                generalModalVisible: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            })
                        }}

                        onSendBefore={() => {
                            // should set false here
                            // otherwise it will submit again and again
                            switch (this.state.generalModalMode) {
                                case FormOption.ASSIGNMENT:
                                    this.setState({isTimeToSubmitAssignment: false});
                                    break;
                                case FormOption.SLIDE:
                                    this.setState({isTimeToSubmitSlide: false});
                                    break;
                                case FormOption.FORUM:
                                    this.setState({isTimeToSubmitForum: false});
                                    break;

                            }

                            this.setState({generalModalConfirmLoading: true})
                        }}

                        onSendSuccess={(response: IAPIResponse<any>) => {
                            switch (this.state.generalModalMode) {
                                case FormOption.ASSIGNMENT:
                                    this.setState({isTimeToSubmitAssignment: false});
                                    break;
                                case FormOption.SLIDE:
                                    this.setState({isTimeToSubmitSlide: false});
                                    break;
                                case FormOption.FORUM:
                                    this.setState({isTimeToSubmitForum: false});
                                    break;
                            }
                            this.setState({
                                generalModalVisible: false,
                                generalModalConfirmLoading: false
                            });
                            message.success(response.message);
                        }}

                        onSendFail={(response: IAPIResponse<any>) => {
                            switch (this.state.generalModalMode) {
                                case FormOption.ASSIGNMENT:
                                    this.setState({isTimeToSubmitAssignment: false});
                                    break;
                                case FormOption.SLIDE:
                                    this.setState({isTimeToSubmitSlide: false});
                                    break;
                                case FormOption.FORUM:
                                    this.setState({isTimeToSubmitForum: false});
                                    break;
                            }
                            this.setState({
                                generalModalVisible: false,
                                generalModalConfirmLoading: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            });
                            message.success(response.message);
                        }}

                        onSendError={(e: any) => {
                            switch (this.state.generalModalMode) {
                                case FormOption.ASSIGNMENT:
                                    this.setState({isTimeToSubmitAssignment: false});
                                    break;
                                case FormOption.SLIDE:
                                    this.setState({isTimeToSubmitSlide: false});
                                    break;
                                case FormOption.FORUM:
                                    this.setState({isTimeToSubmitForum: false});
                                    break;
                            }
                            console.log(e);
                            this.setState({
                                generalModalVisible: false,
                                generalModalConfirmLoading: false,
                                refreshFormTrigger: !this.state.refreshFormTrigger
                            });
                            message.error("發生未知錯誤，請稍候再試")
                        }}
                    />
                </div>
            );
        } else
            return null;
    }
}