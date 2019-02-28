import * as React from "react";
import {ICourse} from "../../types/entities";
import {Divider, Table, Tag} from "antd";
import {ApprovalState, fromApprovalStateToChinese} from "../../types/enums";
import {IAppContext} from "../../store/AppContext";
import {AppContextConsumer} from "../App/App";

export interface ICourseWithKey extends ICourse {
    key: number
}

export interface ICourseDisplayProps {
    courseList: ICourse[]
    okToRelease: (course: ICourse) => void
    notOkToRelease: (course: ICourse) => void
    okToDelete: (course: ICourse) => void
    notOkToDelete: (course: ICourse) => void
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
                    throw new Error("Unexpected Approval State");
            }
            return <span>
                        <Tag color={color}>{fromApprovalStateToChinese(state)}</Tag>
                        <Tag color={course.isReleased ? "#f50" : "#108ee9"}>{course.isReleased ? "已發佈" : "未發佈"}</Tag>
                    </span>
        }
    }, {
        title: '操作',
        key: 'action',
        render: (text: string, course: ICourse) => {
            return (
                <span>
                <a onClick={() => {
                    // console.log(course);
                    if (course.approvalState === ApprovalState.WAITING) {
                        props.notOkToRelease(course);
                    } else {
                        props.okToRelease(course);
                    }
                }}>
                    {course.isReleased ? "再次發佈" : "發佈"}
                </a>
                <Divider type="vertical"/>
                 <a onClick={() => {
                     if (course.approvalState === ApprovalState.APPROVED) {
                         props.notOkToDelete(course);
                     } else {
                         props.okToDelete(course);
                     }
                 }}>刪除</a>
            </span>
            )
        },
    }];
    return (
        <AppContextConsumer>
            {(value: IAppContext) => {
                console.log(value);
                return (
                    <div>
                        <Table
                            bordered={true}
                            columns={columns} dataSource={toCourseWithKey(props.courseList)}/>
                    </div>
                )
            }
            }
        </AppContextConsumer>
    )
};

export default CourseDisplay
