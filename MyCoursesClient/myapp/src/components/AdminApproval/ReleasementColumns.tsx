import {ApprovalState, fromApprovalStateToChinese} from "../../types/enums";
import {ICourse, IReleasement} from "../../types/entities";
import {Tag} from "antd";
import * as React from "react";

const moment = require("moment");

export function ReleasementColumns(): any[] {
    return [{
        title: '發佈編號',
        dataIndex: 'rid',
        key: 'rid',
        width: 100,
    }, {
        title: '課程名稱',
        dataIndex: 'courseEntity',
        key: 'courseEntity',
        width: 100,
        render: ((course: ICourse) => course.name)
    }, {
        title: "教師",
        dataIndex: "courseEntity",
        key: "teacherName",
        width: 100,
        render: ((course: ICourse) => course.teacherEntity.name)
    }, {
        title: "發佈時間",
        dataIndex: "releaseTime",
        key: "releaseTime",
        width: 150,
        render: ((dateTime: number) => moment(dateTime).calendar())
    }, {
        title: "開課日期",
        dataIndex: "effectiveTime",
        key: "effectiveTime",
        width: 150,
        render: ((dateTime: number) => moment(dateTime).format("YYYY-MM-DD"))
    }, {
        title: "結課時間",
        dataIndex: "deadTime",
        key: "deadTime",
        width: 150,
        render: ((dateTime: number) => moment(dateTime).format("YYYY-MM-DD"))
    }, {
        title: '狀態',
        dataIndex: 'approvalState',
        key: 'approvalState',
        width: 100,
        render: (state: ApprovalState, releasement: IReleasement) => {
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
                    </span>)
        }
    }]
}
