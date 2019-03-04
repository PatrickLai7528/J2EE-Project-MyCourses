import * as React from "react";
import {ITeacherStatistics} from "../../types/entities";
import {Col, Divider, Row, Statistic} from "antd";
import {showSemesterStatistics} from "./ShowSesmesterStatisticsForTeacher";
import {showReleasementStatisticsForTeacher} from "./ShowReleasementStatisticsForTeacher";


export const showStatistics = (statistics?: ITeacherStatistics): React.ReactNode => {
    return (
        <div>
            <div style={{marginBottom: 100}}>
                <h1>概述</h1>
                <Divider/>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="創建課程數量"
                                   value={statistics ? statistics.outlineStatistics.created : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="發佈課程數量"
                                   value={statistics ? statistics.outlineStatistics.released : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="總選課人數"
                                   value={statistics ? statistics.outlineStatistics.selected : 0}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>
                        <Statistic title="上傳課件數量"
                                   value={statistics ? statistics.outlineStatistics.uploaded : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="發佈作業數量"
                                   value={statistics ? statistics.outlineStatistics.published : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="討論區留言數"
                                   value={statistics ? statistics.outlineStatistics.commented : 0}/>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 100}}>
                <h1>按學期統計</h1>
                <Divider/>
                {
                    showSemesterStatistics(statistics)
                }
            </div>
            <div style={{marginBottom: 100}}>
                <h1>按課程統計</h1>
                <Divider/>
                {
                    showReleasementStatisticsForTeacher(statistics)
                }
            </div>
        </div>
    )
};
