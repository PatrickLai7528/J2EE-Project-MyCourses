import {IReleasementStatisticsForTeacher, ITeacherStatistics} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic, Table} from "antd";

const moment = require("moment");

export const showReleasementStatisticsForTeacher = (teacherStatistics?: ITeacherStatistics): React.ReactNode => {
    return (
        <div>
            {
                !teacherStatistics ? _show() :
                    teacherStatistics.releasementStatisticsList.map((releasementStatistics: IReleasementStatisticsForTeacher) => {
                        return (
                            <div
                                style={{marginBottom: 50}}
                                key={releasementStatistics.courseName + (releasementStatistics.simplifySelectionList && releasementStatistics.simplifySelectionList.length !== 0 && releasementStatistics.simplifySelectionList[0].selectTime)}>
                                <h2 style={{marginBottom: 15}}>{releasementStatistics.courseName}</h2>
                                {
                                    _show(releasementStatistics)
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
};

function wrappedKey(simplifySelectionList: any[]) {
    for (let item of simplifySelectionList) {
        item.key = item.selectTime + item.studentEmail + item.studentNo + item.studentScore
    }
    return simplifySelectionList;
}

function _show(releasementStatistics?: IReleasementStatisticsForTeacher) {
    return (
        <div>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={4}>
                    <Statistic title="選課人數" value={releasementStatistics ? releasementStatistics.selected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="作業總提交人數"
                               value={releasementStatistics ? releasementStatistics.submitted : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="課件總下載次數"
                               value={releasementStatistics ? releasementStatistics.downloaded : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="討論區總留言數"
                               value={releasementStatistics ? releasementStatistics.commented : 0}/>
                </Col>
            </Row>
            <Table scroll={{y: true}} showHeader={true} title={() => "選課學生列表"}
                   columns={simplifySelectionColumns}
                   dataSource={releasementStatistics ? wrappedKey(releasementStatistics.simplifySelectionList) : []}/>
        </div>
    )
}

const simplifySelectionColumns = [
    {
        title: '名稱',
        dataIndex: 'studentName',
        key: 'studentName',
        width: 120
    }, {
        title: '郵箱',
        dataIndex: 'studentEmail',
        key: 'studentEmail',
        width: 200
    }, {
        title: '學號',
        dataIndex: 'studentNo',
        key: 'studentNo',
        width: 150
    }, {
        title: '選課時間',
        dataIndex: 'tags',
        key: 'selectTime',
        width: 220,
        render: (selectTime: number) => moment(selectTime).format("YYYY-MM-DD HH:mm")
    }, {
        title: "成績",
        dataIndex: "studentScore",
        key: "studentScore",
        width: 100
    }
];