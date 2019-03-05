import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForAdminState} from "../App/App";
import {Divider, message, Table} from "antd";
import {CourseColumns} from "../CourseDisplay/CourseColumns";
import {ICourse, ITeacher} from "../../types/entities";
import {IconText} from "../IconText/IconText";
import {ApprovalState} from "../../types/enums";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendActionCallback} from "../App/SendActionProps";


export interface ICourseApprovalProps {
    userType: UserType
    forAdmin: IAppForAdminState
}


interface ICourseApprovalState {
    loading: boolean
}

type ApprovalChange = "approve" | "reject"

export class CourseApproval extends React.Component<ICourseApprovalProps, ICourseApprovalState> {
    public constructor(props: ICourseApprovalProps) {
        super(props);
        this.state = {loading: false}
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>審批課程</h1>
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
        let courseColumns = CourseColumns();
        courseColumns.push({
                title: "教師",
                dataIndex: "teacherEntity",
                key: "teacherEntity",
                render: ((teacher: ITeacher) => teacher.name)
            });
        const operationColumn = {
            title: '操作',
            key: 'action',
            render: (text: string, course: ICourse) => {
                return (
                    <span>
                        <a onClick={() => this.handleSendApprovalChange(course, "approve")}><IconText type={"check"}
                                                                                                      text={"通過"}/></a>
                    <Divider type="vertical"/>
                        <a onClick={() => this.handleSendApprovalChange(course, "reject")}><IconText type={"close"}
                                                                                                     text={"不通過"}/></a>
                    </span>
                )
            }
        };
        console.log(courseColumns);
        courseColumns.push(operationColumn);
        return courseColumns;
    }

    private getDataSource() {
        if (this.props.userType === "admin" && this.props.forAdmin) {
            return this.props.forAdmin.courseList;
        }
        throw new Error();
    }

    private handleSendApprovalChange(course: ICourse, approvalChange: ApprovalChange) {
        // check course

        if (course.isReleased) {
            message.warn("課程已經發佈了，不能修改");
            return;
        }
        if (course.approvalState === ApprovalState.APPROVED) {
            message.warn("課程已經通過了，不能修改");
            return;
        }

        const callback: ISendActionCallback = {
            onBefore: () => this.setState({loading: true}),
            onSuccess: (response: IAPIResponse<ICourse[]>) => {
                message.success(response.message);
                this.setState({loading: false})
            },
            onError: (response: IAPIResponse<ICourse[]>) => {
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
                this.props.forAdmin.sendCourseApprove({cid: course.cid}, callback);
                return;
            case "reject":
                this.props.forAdmin.sendCourseReject({cid: course.cid}, callback);
        }
    }
}
