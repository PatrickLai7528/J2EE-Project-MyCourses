import {IAdminStatistics, ISimplifySelectionForAdmin, IStudentStatisticsForAdmin} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic, Table} from "antd";
import {fromSelectionStateToChinese, SelectionState} from "../../types/enums";

const moment = require("moment");

function wrappedKey(simplifySelectionList: any[]) {
    for(let item of simplifySelectionList)
        item.key = item.courseName + item.selectedTime + item.score;
    return simplifySelectionList
}

const  simplifySelectionColumns= [{
    title: '課程名稱',
    dataIndex: 'courseName',
    key: 'courseName',
    width: 190
}, {
    title: '選課日期',
    dataIndex: 'selectTime',
    key: 'selectTime',
    width: 120,
    render: ((time: number) => moment(time).format("YYYY-MM-DD"))
}, {
    title: '選課狀態',
    dataIndex: 'selectionState',
    key: 'selectionState',
    width: 120,
    render: ((state:SelectionState) => fromSelectionStateToChinese(state))
}, {
    title: '分數',
    dataIndex: 'score',
    key: 'score',
    width: 70,
}
];

function _show(studentStatistics?: IStudentStatisticsForAdmin): React.ReactNode {
    return (
        <div>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="選課數量" value={studentStatistics ? studentStatistics.selected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相比平均"
                               suffix={"%"}
                               precision={1}
                               valueStyle={studentStatistics && studentStatistics.selectedAvgProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={studentStatistics ? studentStatistics.selectedAvgProportion * 100 : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="退課數量"
                               value={studentStatistics ? studentStatistics.dropped : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相比平均"
                               suffix={"%"}
                               precision={1}
                               valueStyle={studentStatistics && studentStatistics.droppedAvgProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={studentStatistics ? studentStatistics.droppedAvgProportion * 100 : 0}/>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="登錄次數" value={studentStatistics ? studentStatistics.loggedIn : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相同平均"
                               suffix={"%"}
                               precision={1}
                               valueStyle={studentStatistics && studentStatistics.loggedInAvgProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                               value={studentStatistics ? studentStatistics.loggedInAvgProportion * 100 : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="最近登錄"
                               value={studentStatistics && studentStatistics.recentLogInTime !== null ? (moment(studentStatistics.recentLogInTime).format("YYYY-MM-DD HH:mm:ss")) : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="注冊時間"
                               value={studentStatistics ? (moment(studentStatistics.registryTime).format("YYYY-MM-DD")) : 0}/>
                </Col>
            </Row>
            <Table scroll={{y: true}} showHeader={true} title={() => "選課列表"}
                   columns={simplifySelectionColumns}
                   dataSource={studentStatistics ? wrappedKey(studentStatistics.simplifySelectionList) : []}/>
        </div>
    )
}

export const showStudentStatisticsForAdmin = (statistics?: IAdminStatistics): React.ReactNode => {
    return (
        <div>
            {
                !statistics || !statistics.studentStatisticsList || statistics.studentStatisticsList.length === 0 ? _show() :
                    statistics.studentStatisticsList.map((s: IStudentStatisticsForAdmin) => {
                        return (
                            <div
                                style={{marginBottom: 50}}
                                key={s.studentEmail}>
                                <h2 style={{marginBottom: 15}}>{s.studentName}</h2>
                                {_show(s)}
                            </div>
                        )
                    })
            }
        </div>
    )
}