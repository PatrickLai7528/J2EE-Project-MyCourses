import {IStudent, ISubmission} from "../../types/entities";
import {IconText} from "../IconText/IconText";
import * as React from "react";
import NetworkSettings from "../../setting/NetworkSettings";
import {ColumnProps} from "antd/lib/table";

const moment = require("moment");

export class SubmissionDisplayTableColumns {
    public static getColumns(): ColumnProps<ISubmission>[] {
        return [{
            title: '姓名',
            dataIndex: 'studentEntity',
            key: 'studentName',
            render: (student: IStudent) => student.name
        }, {
            title: '學號',
            dataIndex: 'studentEntity',
            key: 'studentNo',
            render: (student: IStudent) => student.studentNo
        }, {
            title: '郵箱',
            dataIndex: 'studentEntity',
            key: 'studentEmail',
            render: (student: IStudent) => student.studentEmail
        }, {
            title: "提交日期",
            dataIndex: "submitTime",
            key: "submitTime",
            render: (date: number) => moment(date).calendar()
        }, {
            title: "文件",
            dataIndex: "filePath",
            key: "filePath",
            render: (filePath: string, submission: ISubmission) => <a
                href={NetworkSettings.getOpenNetworkIP() + "/file/submission/download?fileName=" + filePath + "&rename=" + submission.studentEntity.studentNo}>
                <IconText
                    type={"download"} text={filePath}/></a>
        }
        ];
    }
}