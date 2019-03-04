import {ReactNode} from "react";
import {IAdminStatistics, IStudentStatisticsForAdmin, ITeacherStatisticsForAdmin} from "../../types/entities";
import * as React from "react";
import {Col, Row, Statistic} from "antd";


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
                    <Statistic title="否決/通過比"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.rejectedApprovedProportion : 0}/>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                <Col span={4}>
                    <Statistic title="選課人數" value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.selected : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="滿額比"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.fulledAllProportion : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="退課人數比"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.droppedAllProportion : 0}/>
                </Col>
                <Col span={4}>
                    <Statistic title="補選人數比"
                               value={teacherStatisticsForAdmin ? teacherStatisticsForAdmin.bySelectedAllProportion : 0}/>
                </Col>
            </Row>
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
