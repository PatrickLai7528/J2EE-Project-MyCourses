import * as React from "react";
import {ICourse} from "../../types/entities";
import {Button, Divider, Icon, Table, Tag} from "antd";
import {ApprovalState, toChinese} from "../../types/enums";

export interface ICourseWithKey extends ICourse {
    key: number
}

export interface ICourseDisplayProps {
    courseList: ICourse[]
    okToRelease: (course: ICourse) => void
    notOkToRelease: (course: ICourse) => void
}

const toCourseWithKey = (courseList: ICourse[]): ICourseWithKey[] => {
    let ret: any[] = courseList;
    for (let item of ret)
        item.key = item.cid;
    return ret;
};


const CourseDisplay: React.FunctionComponent<ICourseDisplayProps> = (props: ICourseDisplayProps) => {
    const columns = [{
        title: '課程編號',
        dataIndex: 'cid',
        key: 'cid',
        width: 150,
    }, {
        title: '課程名稱',
        dataIndex: 'name',
        key: 'name',
        width: 250,
    }, {
        title: '狀態',
        dataIndex: 'approvalState',
        key: 'approvalState',
        width: 150,
        render: (state: ApprovalState) => {
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
                    throw new Error("Unexpected Approval State");
            }
            return (<Tag color={color} >{toChinese(state)}</Tag>)
        }
    }, {
        title: '操作',
        key: 'action',
        render: (text: string, course: ICourse) => {
            return (
                <span>
                <Button htmlType="button" onClick={() => {
                    console.log(course);
                    if (course.approvalState === ApprovalState.WAITING) {
                        props.notOkToRelease(course);
                    } else {
                        props.okToRelease(course);
                    }
                }}>
                    發佈
                </Button>
                <Divider type="vertical"/>
                 <a href="javascript:;">Delete</a>
                 <Divider type="vertical"/>
                 <a href="javascript:;" className="ant-dropdown-link">
                   More actions <Icon type="down"/>
                 </a>
            </span>
            )
        },
    }];

    return (
        <div>
            <Table
                bordered={true}
                columns={columns} dataSource={toCourseWithKey(props.courseList)}/>
        </div>
    )
};

export default CourseDisplay
