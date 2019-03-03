import * as React from "react";
import {ICourse} from "../../types/entities";
import {Divider, Table, Tag} from "antd";
import {ApprovalState, fromApprovalStateToChinese} from "../../types/enums";
import {CourseColumns} from "./CourseColumns";

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
    let columns = CourseColumns();
    const operationColumn = {
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
        }
    };

    columns.push(operationColumn);

    return (
        <div>
            <Table
                bordered={true}
                columns={columns} dataSource={toCourseWithKey(props.courseList)}/>
        </div>
    )
};

export default CourseDisplay
