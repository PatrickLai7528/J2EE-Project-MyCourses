import {IAdminStatistics, IStudentStatisticsForAdmin} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic} from "antd";

const moment = require("moment");

function _show(studentStatistics?: IStudentStatisticsForAdmin): React.ReactNode {
    return (
        <div>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="選課數量" value={studentStatistics ? studentStatistics.selected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相比平均"
                               value={studentStatistics ? studentStatistics.selectedAvgProportion : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="退課數量"
                               value={studentStatistics ? studentStatistics.dropped : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相比平均"
                               value={studentStatistics ? studentStatistics.droppedAvgProportion : 0}/>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="登錄次數" value={studentStatistics ? studentStatistics.loggedIn : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="相同平均"
                               value={studentStatistics ? studentStatistics.loggedInAvgProportion : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="最近登錄"
                               value={studentStatistics && studentStatistics.recentLogInTime !== null ? (moment(studentStatistics.recentLogInTime).format("YYYY-MM-DD HH:mm:ss")) : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="注冊時間"
                               value={studentStatistics ? (moment(studentStatistics.registryTime).format("YYYY-MM-DD HH:mm:ss")) : 0}/>
                </Col>
            </Row>
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