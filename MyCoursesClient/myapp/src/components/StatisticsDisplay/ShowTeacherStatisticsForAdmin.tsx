import {ReactNode} from "react";
import {
    IAdminStatistics,
    ISimplifyCourseForAdmin, ISimplifyReleasementForAdmin,
    IStudentStatisticsForAdmin,
    ITeacherStatisticsForAdmin
} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic, Table} from "antd";
import {ApprovalState, fromApprovalStateToChinese} from "../../types/enums";

const moment = require("moment");


function wrappedCourseWithKey(list: any[]) {
    for (let item of list) {
        item.key = item.courseName + item.addTime;
    }
    return list;
}

let simplifyCourseColumns = [{
    title: '課程名稱',
    dataIndex: 'courseName',
    key: 'courseName',
    width: 190
}, {
    title: '創建時間',
    dataIndex: 'addTime',
    key: 'addTime',
    width: 120,
    render: ((time: number) => moment(time).format("YYYY-MM-DD"))
}, {
    title: '狀態',
    dataIndex: 'approvalState',
    key: 'approvalState',
    width: 120,
    render: ((state: ApprovalState) => fromApprovalStateToChinese(state))
}
];

let simplifyReleasementColumns = [{
    title: '課程名稱',
    dataIndex: 'courseName',
    key: 'courseName',
    width: 190
}, {
    title: '狀態',
    dataIndex: 'approvalState',
    key: 'approvalState',
    width: 120,
    render: ((state: ApprovalState) => fromApprovalStateToChinese(state))
}, {
    title: '限選',
    dataIndex: 'limited',
    key: 'limited',
    width: 70,
}, {
    title: '選課',
    dataIndex: 'selected',
    key: 'selected',
    width: 70,
}, {
    title: '退選',
    dataIndex: 'dropped',
    key: 'dropped',
    width: 70,
}, {
    title: '平均分',
    dataIndex: 'avgScore',
    key: 'avgScore',
    width: 70,
}, {
    title: '不合格',
    dataIndex: 'failed',
    key: 'failed',
    width: 70,
}, {
    title: '開課日期',
    dataIndex: 'effectiveTime',
    key: 'effectiveTime',
    width: 120,
    render: ((time: number) => moment(time).format("YYYY-MM-DD"))
}, {
    title: '結課日期',
    dataIndex: 'deadTime',
    key: 'deadTime',
    width: 120,
    render: ((time: number) => moment(time).format("YYYY-MM-DD"))
}, {
    title: '發佈日期',
    dataIndex: 'releaseTime',
    key: 'releaseTime',
    width: 120,
    render: ((time: number) => moment(time).format("YYYY-MM-DD"))
},
];

function wrappedReleasementWithKey(list: any[]) {
    for (let item of list) {
        item.key = item.effectiveTime + item.deadTime + item.avgScore + item.courseName + item.dropped + item.bySelected
    }
    return list;
}

function _show(teacherStatisticsForAdmin?: ITeacherStatisticsForAdmin): ReactNode {
    return (
        <div>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="創建課程" value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.created : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="發佈課程"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.released : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="否決數"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.rejected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="否決比"
                               suffix={"%"}
                               precision={1}
                               valueStyle={teacherStatisticsForAdmin && teacherStatisticsForAdmin.rejectedApprovedProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.rejectedApprovedProportion * 100 : 0}/>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="選課人數" value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.selected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="滿額比"
                               precision={1}
                               suffix={"%"}
                               valueStyle={teacherStatisticsForAdmin && teacherStatisticsForAdmin.fulledAllProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.fulledAllProportion * 100 : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="退課人數比"
                               precision={1}
                               suffix={"%"}
                               valueStyle={teacherStatisticsForAdmin && teacherStatisticsForAdmin.droppedAllProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.droppedAllProportion * 100 : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="補選人數比"
                               precision={1}
                               suffix={"%"}
                               valueStyle={teacherStatisticsForAdmin && teacherStatisticsForAdmin.bySelectedAllProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.bySelectedAllProportion * 100 : 0}/>
                </Col>
            </Row>
            <Table scroll={{y: true}} showHeader={true} title={() => "課程創建列表"}
                   columns={simplifyCourseColumns}
                   dataSource={teacherStatisticsForAdmin ? wrappedCourseWithKey(teacherStatisticsForAdmin.simplifyCourseList) : []}/>
            <Table scroll={{y: true}} showHeader={true} title={() => "課程發佈列表"}
                   columns={simplifyReleasementColumns}
                   dataSource={teacherStatisticsForAdmin ? wrappedReleasementWithKey(teacherStatisticsForAdmin.simplifyReleasementList) : []}/>

        </div>
    )
}

export const showTeacherStatisticsForAdmin = (statistics?: IAdminStatistics): React.ReactNode => {
    return (
        <div>
            {
                !statistics || !statistics.teacherStatisticsList || statistics.studentStatisticsList.length === 0 ? _show() :
                    statistics.teacherStatisticsList.map((t: ITeacherStatisticsForAdmin) => {
                        return (
                            <div
                                style={{marginBottom: 50}}
                                key={t.teacherEmail}>
                                <h2 style={{marginBottom: 15}}>{t.teacherName}</h2>
                                {_show(t)}
                            </div>
                        )
                    })
            }
        </div>
    )
}
