import {IAdminStatistics} from "../../types/entities";
import {Col, Divider, Row, Statistic} from "antd";
import * as React from "react";
import {showTeacherStatisticsForAdmin} from "./ShowTeacherStatisticsForAdmin";
import {showStudentStatisticsForAdmin} from "./ShowStudentStatisticsForAdmin";

export const showAdminStatistics = (statistics?: IAdminStatistics): React.ReactNode => {
    return (
        <div>
            <div style={{marginBottom: 100}}>
                <h1>概述</h1>
                <Divider/>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="學生總數"
                                   value={statistics ? statistics.outlineStatistics.student : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="教師總數"
                                   value={statistics ? statistics.outlineStatistics.teacher : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="學生教師比"
                                   suffix={"%"}
                                   precision={1}
                                   valueStyle={statistics && statistics.outlineStatistics.studentTeacherProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                                   value={statistics ? statistics.outlineStatistics.studentTeacherProportion * 100 : 0}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="課程創建數量"
                                   value={statistics ? statistics.outlineStatistics.created : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="課程發佈數量"
                                   value={statistics ? statistics.outlineStatistics.released : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="發佈/創建比"
                                   suffix={"%"}
                                   precision={1}
                                   valueStyle={statistics && statistics.outlineStatistics.releasedCreatedProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                                   value={statistics ? statistics.outlineStatistics.releasedCreatedProportion * 100 : 0}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="通過總數"
                                   value={statistics ? statistics.outlineStatistics.approved : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="否決總量"
                                   value={statistics ? statistics.outlineStatistics.rejected : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="否決/通過比"
                                   suffix={"%"}
                                   precision={1}
                                   valueStyle={statistics && statistics.outlineStatistics.rejectedApprovedProportion >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                                   value={statistics ? statistics.outlineStatistics.rejectedApprovedProportion * 100 : 0}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="最近七日教師注冊"
                                   value={statistics ? statistics.outlineStatistics.teacherRegistryLast7 : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="最近七日學生注冊"
                                   value={statistics ? statistics.outlineStatistics.studentRegistryLast7 : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="相近上週（總用戶）"
                                   suffix={"%"}
                                   precision={1}
                                   valueStyle={statistics && statistics.outlineStatistics.allUserRegistryCompareToLast7 >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                                   value={statistics ? statistics.outlineStatistics.allUserRegistryCompareToLast7 * 100 : 0}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                    <Col span={4}>
                        <Statistic title="最近七日教師登錄"
                                   value={statistics ? statistics.outlineStatistics.teacherLogInLast7 : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="最近七日學生登錄"
                                   value={statistics ? statistics.outlineStatistics.studentLogInLast7 : 0}/>
                    </Col>
                    <Col span={4}>
                        <Statistic title="相比上週（總用戶）"
                                   suffix={"%"}
                                   precision={1}
                                   valueStyle={statistics && statistics.outlineStatistics.allUserLogInCompareToLast7 >= 1 ? {color: '#3f8600'} : {color: '#cf1322'}}
                                   value={statistics ? statistics.outlineStatistics.allUserLogInCompareToLast7 * 200 : 0}/>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 100}}>
                <h1>按教師統計</h1>
                <Divider/>
                {
                    showTeacherStatisticsForAdmin(statistics)
                }
            </div>
            <div style={{marginBottom: 100}}>
                <h1>按學生統計</h1>
                <Divider/>
                {
                    showStudentStatisticsForAdmin(statistics)
                }
            </div>
        </div>
    )
}