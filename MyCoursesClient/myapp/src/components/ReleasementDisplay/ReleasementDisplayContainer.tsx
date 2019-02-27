import * as React from "react";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {Divider, message} from "antd";
import ReleasementDisplay from "./ReleasementDisplay";
import {ISendCourseSelectionProps, UserStateProps} from "../App/GeneralProps";
import {ISendSelectionData} from "../../api/SelectionAPI";

export interface IReleasementDisplayContainerProps extends UserStateProps, ISendCourseSelectionProps {
    releasementList: IReleasement[]
}

interface IReleasementDisplayContainerState {
    // releasementListOfStudent: IReleasement[]
    // isLoading: boolean
    isCourseSelectionSending: boolean
}

export default class ReleasementDisplayContainer extends React.Component<IReleasementDisplayContainerProps, IReleasementDisplayContainerState> {
    public constructor(props: IReleasementDisplayContainerProps) {
        super(props);
        this.state = {
            isCourseSelectionSending: false
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>所有課程</h1>
                <Divider/>
                <ReleasementDisplay
                    isCourseSelectionSending={this.state.isCourseSelectionSending}
                    releasementList={this.props.releasementList}
                    sendSelectAction={(releasement: IReleasement) => {
                        if (!(this.props.userType === "student") || !this.props.email) {
                            message.error("請先登錄");
                        } else {
                            let onBefore = () => {
                                this.setState({isCourseSelectionSending: true})
                            };
                            let onSuccess = (response: IAPIResponse<any>) => {
                                message.success(response.message);
                                this.setState({isCourseSelectionSending: false})
                            };
                            let onFail = (response: IAPIResponse<any>) => {
                                message.error(response.message);
                                this.setState({isCourseSelectionSending: false})
                            };
                            let onError = (e: any) => {
                                message.error("發生未知錯誤，請稍候再試");
                                this.setState({isCourseSelectionSending: false})
                            };
                            const data: ISendSelectionData = {
                                studentEmail: this.props.email,
                                rid: releasement.rid
                            };
                            this.props.sendCourseSelection(data, {
                                onBefore,
                                onSuccess,
                                onFail,
                                onError
                            });
                        }
                    }}
                />
            </div>
        )
    }
}