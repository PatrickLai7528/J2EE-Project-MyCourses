import {ApprovalState, fromApprovalStateToChinese} from "../../types/enums";
import {ICourse} from "../../types/entities";
import {Tag} from "antd";
import * as React from "react";

const moment = require("moment");

export function CourseColumns(): any[] {
    return [{
        title: '課程編號',
        dataIndex: 'cid',
        key: 'cid',
        width: 100,
    }, {
        title: '課程名稱',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    }, {
        title: "創建時間",
        dataIndex: "addTime",
        key: "addTime",
        render: (dateTime: number) => moment(dateTime).calendar()
    }, {
        title: '狀態',
        dataIndex: 'approvalState',
        key: 'approvalState',
        width: 200,
        render: (state: ApprovalState, course: ICourse) => {
            let color: string = "";
            switch (state) {
                case ApprovalState.APPROVED:
                    color = "#2db7f5";
                    break;
                case ApprovalState.REJECTED:
                    color = "#f50";
                    break;
                case ApprovalState.WAITING:
                    color = "#87d068";
                    break;
                default:
                    throw new Error("Unexpected CourseApproval State");
            }
            return (<span>
                        <Tag color={color}>{fromApprovalStateToChinese(state)}</Tag>
                        <Tag color={course.isReleased ? "#f50" : "#108ee9"}>{course.isReleased ? "已發佈" : "未發佈"}</Tag>
                    </span>)
        }
    }]
}
