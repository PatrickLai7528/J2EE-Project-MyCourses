import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {IReleasementStatistics, ISemesterStatistics, ITeacherStatistics} from "../../types/entities";
import {Col, Divider, Empty, message, Row, Spin, Statistic, Table, Tag} from "antd";
import {StatisticsAPI} from "../../api/StatisticsAPI";
import IAPIResponse from "../../api/IAPIResponse";

const moment = require("moment");

export interface IStatisticsDisplayProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IStatisticsDisplayState {
    teacherStatistics?: ITeacherStatistics
}

export class StatisticsDisplay extends React.Component<IStatisticsDisplayProps, IStatisticsDisplayState> {

    public constructor(props: IStatisticsDisplayProps) {
        super(props);
        this.state = {teacherStatistics: undefined}
    }

    public componentWillMount(): void {
        StatisticsAPI.getInstance().getTeacherStatistics(this.getEmail())
            .then((response: IAPIResponse<ITeacherStatistics>) => {
                if (response.isSuccess && response.payload)
                    this.setState({teacherStatistics: response.payload})
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試")
            })
    }


    public render(): React.ReactNode {
        console.log(this.state.teacherStatistics);
        if (!this.state.teacherStatistics) {
            return (
                <Spin spinning={true}>
                    {this.showStatistics()}
                </Spin>
            );
        } else if (!this.state.teacherStatistics.outlineStatistics || !this.state.teacherStatistics.releasementStatisticsList || !this.state.teacherStatistics.semesterStatisticsList) {
            return (<div>
                    <h1>統計信息</h1>
                    <Divider/>
                    <Empty/>
                </div>
            )
        } else
            return (
                this.showStatistics()
            )
    }


    private getEmail(): string {
        if (this.props.userType && this.props.forTeacher)
            return this.props.forTeacher.email;
        throw new Error();
    }

    private showStatistics(): React.ReactNode {
        return (
            <div>
                <div style={{marginBottom: 100}}>
                    <h1>概述</h1>
                    <Divider/>
                    <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                        <Col span={4}>
                            <Statistic title="創建課程數量"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.created : 0}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="發佈課程數量"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.released : 0}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="總選課人數"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.selected : 0}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={4}>
                            <Statistic title="上傳課件數量"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.uploaded : 0}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="發佈作業數量"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.published : 0}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="討論區留言數"
                                       value={this.state.teacherStatistics ? this.state.teacherStatistics.outlineStatistics.commented : 0}/>
                        </Col>
                    </Row>
                </div>
                <div style={{marginBottom: 100}}>
                    <h1>按學期統計</h1>
                    <Divider/>
                    {
                        this.showSemesterStatistics()
                    }
                </div>
                <div style={{marginBottom: 100}}>
                    <h1>按課程統計</h1>
                    <Divider/>
                    {
                        this.showReleasementStatistics()
                    }
                </div>
            </div>
        )
    }

    private showSemesterStatistics(): React.ReactNode {

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

        function wrappedKey(simplifyReleasementList: any[]) {
            for (let item of simplifyReleasementList)
                item.key = item.effectiveTime + item.deadTime;
            return simplifyReleasementList;
        }

        let _show = (semesterStatistics?: ISemesterStatistics) => {
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
        }

        return (
            <div>
                {
                    !this.state.teacherStatistics ? <div key={-1}>{_show()}</div> :
                        this.state.teacherStatistics.semesterStatisticsList.map((semesterStatistics: ISemesterStatistics) => {
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
    }

    private showReleasementStatistics(): React.ReactNode {

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


        function wrappedKey(simplifySelectionList: any[]) {
            for (let item of simplifySelectionList) {
                item.key = item.selectTime + item.studentEmail + item.studentNo + item.studentScore
            }
            return simplifySelectionList;
        }

        function _show(releasementStatistics?: IReleasementStatistics) {
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

        return (
            <div>
                {
                    !this.state.teacherStatistics ? _show() :
                        this.state.teacherStatistics.releasementStatisticsList.map((releasementStatistics: IReleasementStatistics) => {
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
    }
}