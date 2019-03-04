import {ISemesterStatisticsForTeacher, ITeacherStatistics} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic, Table} from "antd";

const moment = require("moment");

export const showSemesterStatistics = (teacherStatistics?: ITeacherStatistics): React.ReactNode => {
    return (
        <div>
            {
                !teacherStatistics ? <div key={-1}>{_show()}</div> :
                    teacherStatistics.semesterStatisticsList.map((semesterStatistics: ISemesterStatisticsForTeacher) => {
                            return (
                                <div
                                    style={{marginBottom: 50}}
                                    key={semesterStatistics.semester}>
                                    <h2 style={{marginBottom: 15}}>{semesterStatistics.semester}</h2>
                                    {_show(semesterStatistics)}
                                </div>
                            )
                        }
                    )
            }
        </div>
    )
};


function wrappedKey(simplifyReleasementList: any[]) {
    for (let item of simplifyReleasementList)
        item.key = item.effectiveTime + item.deadTime;
    return simplifyReleasementList;
}

let simplifyReleasementColumn = [{
    title: '課程名稱',
    dataIndex: 'courseName',
    key: 'courseName',
    width: 190
}, {
    title: '開課日期',
    dataIndex: 'effectiveTime',
    key: 'effectiveTime',
    width: 120,
    render: ((effectiveTime: number) => moment(effectiveTime).format("YYYY-MM-DD"))
}, {
    title: '結課日期',
    dataIndex: 'deadTime',
    key: 'deadTime',
    width: 120,
    render: ((deadTime: number) => moment(deadTime).format("YYYY-MM-DD"))
}, {
    title: '選課人數',
    dataIndex: 'selected',
    key: 'selected',
    width: 70,
}, {
    title: '課件數量',
    dataIndex: 'uploaded',
    key: 'uploaded',
    width: 70,
}, {
    title: '功課數量',
    dataIndex: 'published',
    key: 'published',
    width: 70,
}, {
    title: '留言數量',
    dataIndex: 'commented',
    key: 'commented',
    width: 70,
}, {
    title: '提交作業人數',
    dataIndex: 'submitted',
    key: 'submitted',
    width: 90,
}
];


let _show = (semesterStatistics?: ISemesterStatisticsForTeacher) => {
    return (
        <div>
            <Row style={{marginBottom: 25}} type="flex" justify="space-around" align="middle">
                <Col span={4}>
                    <Statistic title="創建課程數量" value={semesterStatistics ? semesterStatistics.created : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="發表課程數量" value={semesterStatistics ? semesterStatistics.released : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="總選課人數" value={semesterStatistics ? semesterStatistics.selected : 0}/>
                </Col>
            </Row>
            <Table
                scroll={{y: true}} showHeader={true} title={() => "課程發佈列表"}
                columns={simplifyReleasementColumn}
                loading={semesterStatistics === undefined}
                dataSource={semesterStatistics ? wrappedKey(semesterStatistics.simplifyReleasementList) : []}/>
        </div>
    )
};