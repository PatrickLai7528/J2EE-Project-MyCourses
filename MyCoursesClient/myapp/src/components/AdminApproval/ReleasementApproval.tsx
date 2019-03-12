import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForAdminState} from "../App/App";
import {Divider, message, Table} from "antd";
import {IReleasement} from "../../types/entities";
import {IconText} from "../IconText/IconText";
import {ApprovalState} from "../../types/enums";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendActionCallback} from "../App/SendActionProps";
import {ReleasementColumns} from "./ReleasementColumns";

export interface IReleasementApprovalProps {
    userType:UserType
    forAdmin:IAppForAdminState
}


interface IReleasementApprovalState {
    loading: boolean
}

type ApprovalChange = "approve" | "reject"

export class ReleasementApproval extends React.Component<IReleasementApprovalProps, IReleasementApprovalState> {
    public constructor(props: IReleasementApprovalProps) {
        super(props);
        this.state = {loading: false}
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>審批課程發佈</h1>
                <Divider/>
                <Table loading={this.state.loading} columns={this.getColumns()}
                       dataSource={this.wrappedKey(this.getDataSource())}/>
            </div>
        )
    }

    private wrappedKey(dataSource: any[]) {
        for (let item of dataSource)
            item.key = item.cid;
        return dataSource;
    }

    private getColumns() {
        let releasementColumns:any[] = ReleasementColumns();
        const operationColumn = {
            title: '操作',
            key: 'action',
            render: (text: string, Releasement: IReleasement) => {
                return (
                    <span>
                        <a onClick={() => this.handleSendApprovalChange(Releasement, "approve")}><IconText type={"check"}
                                                                                                      text={"通過"}/></a>
                    <Divider type="vertical"/>
                        <a onClick={() => this.handleSendApprovalChange(Releasement, "reject")}><IconText type={"close"}
                                                                                                     text={"不通過"}/></a>
                    </span>
                )
            }
        };
        console.log(releasementColumns);
        releasementColumns.push(operationColumn);
        return releasementColumns;
    }

    private getDataSource() {
        if (this.props.userType === "admin" && this.props.forAdmin) {
            return this.props.forAdmin.releasementList;
        }
        throw new Error();
    }

    private handleSendApprovalChange(releasement: IReleasement, approvalChange: ApprovalChange) {
        // check Releasement
        const now:number = new Date().getTime();
        if (releasement.effectiveTime <= now && releasement.deadTime >= now) {
            message.warn("課程已經過了開課日期，不能修改");
            return;
        }
        if (releasement.approvalState === ApprovalState.APPROVED) {
            message.warn("課程已經通過了，不能修改");
            return;
        }
        if(releasement.approvalState == ApprovalState.REJECTED){
            message.warn("課程已經取消了，不能修改");
            return;
        }

        const callback: ISendActionCallback = {
            onBefore: () => this.setState({loading: true}),
            onSuccess: (response: IAPIResponse<IReleasement[]>) => {
                message.success(response.message);
                this.setState({loading: false})
            },
            onError: (response: IAPIResponse<IReleasement[]>) => {
                message.error(response.message);
                this.setState({loading: false})
            },
            onFail: () => {
                message.error("發生未知錯誤，請稍候再試");
                this.setState({loading: false})
            },
        };
        switch (approvalChange) {
            case "approve":
                this.props.forAdmin.sendReleasementApprove({rid: releasement.rid}, callback);
                return;
            case "reject":
                this.props.forAdmin.sendReleasementReject({rid: releasement.rid}, callback);
        }
    }
}
