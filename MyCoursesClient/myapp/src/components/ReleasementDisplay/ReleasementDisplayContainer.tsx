import * as React from "react";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import CourseAPI from "../../api/CourseAPI";
import {Divider, message, Spin} from "antd";
import ReleasementDisplay from "./ReleasementDisplay";
import {UserType} from "../../api/UserAPI";
import SelectionAPI from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";

export interface IReleamentDisplayContainerProps {
    userType: UserType,
    email: string | undefined
}


interface IReleasementDisplayContainerState {
    releasementList: IReleasement[]
    isLoading: boolean
}

export default class ReleasementDisplayContainer extends React.Component<IReleamentDisplayContainerProps, IReleasementDisplayContainerState> {
    public constructor(props: IReleamentDisplayContainerProps) {
        super(props);
        this.state = {
            releasementList: [],
            isLoading: false
        }
    }

    public componentDidMount() {
        this.setState({isLoading: true});
        ReleasementAPI.getInstance().getAllReleasement()
            .then((response: IAPIResponse<IReleasement[]>) => {
                if (response.isSuccess) {
                    if (response.payload)
                        this.setState({releasementList: response.payload, isLoading: false})
                } else {
                    message.error(response.message);
                    this.setState({isLoading: false})
                }
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>所有課程</h1>
                <Divider/>
                <Spin spinning={this.state.isLoading}>
                    <ReleasementDisplay
                        releasementList={this.state.releasementList}
                        isLoading={this.state.isLoading}
                        sendSelectAction={(releasement: IReleasement) => {
                            console.log(this.props);
                            if (!(this.props.userType === "student") || !this.props.email) {
                                message.error("請先登錄");
                            } else {
                                SelectionAPI.getInstance().sendSelection(this.props.email, String(releasement.rid))
                                    .then((response: IAPIResponse<any>) => {
                                        if (response.isSuccess) {
                                            message.success(response.message);
                                        } else {
                                            message.error(response.message);
                                        }
                                    })
                                    .catch((e: any) => {
                                        console.log(e);
                                        message.error("出現未知錯誤，請稍候再試！");
                                    })
                            }
                        }}
                    />
                </Spin>
            </div>
        )
    }
}