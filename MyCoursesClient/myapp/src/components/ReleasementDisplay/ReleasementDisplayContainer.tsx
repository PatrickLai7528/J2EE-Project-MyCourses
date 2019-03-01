import * as React from "react";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {Divider, message} from "antd";
import ReleasementDisplay from "./ReleasementDisplay";
import {ISendSelectionData} from "../../api/SelectionAPI";
import {IAppForStudentState, IAppForVisitorState} from "../App/App";
import {UserType} from "../../api/UserAPI";
import {release} from "os";

export interface IReleasementDisplayContainerProps {
    // releasementList: IReleasement[]
    userType: UserType
    forVisitor?: IAppForVisitorState
    forStudent?: IAppForStudentState
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
        let releasementList: IReleasement [] = [];
        if (this.props.forStudent)
            releasementList = this.props.forStudent.releasementList;
        else if (this.props.forVisitor)
            releasementList = this.props.forVisitor.releasementList;
        return (
            <div>
                <h1>所有課程</h1>
                <Divider/>
                <ReleasementDisplay
                    isCourseSelectionSending={this.state.isCourseSelectionSending}
                    releasementList={releasementList}
                    sendSelectAction={(releasement: IReleasement) => {
                        if (this.props.userType === "visitor" || !this.props.forStudent) {
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
                                console.log(e);
                                message.error("發生未知錯誤，請稍候再試");
                                this.setState({isCourseSelectionSending: false})
                            };
                            const data: ISendSelectionData = {
                                studentEmail: this.props.forStudent.email,
                                rid: releasement.rid
                            };
                            this.props.forStudent.sendCourseSelection(data, {
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