import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {IReleasement} from "../../types/entities";
import {Col, Divider, Row, Statistic, Table, Tag} from "antd";

export interface IStatisticsDisplayProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IStatisticsDisplayState {

}

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a href="javascript:;">{text}</a>,
}, {
    title: '學號',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '郵箱',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '選課時間',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => {
        return (
            <span>
          {tags.map((tag: any) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                  color = 'volcano';
              }
              return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
        );
    },
}];


const columns2 = [{
    title: '課程名稱',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a href="javascript:;">{text}</a>,
}, {
    title: '教師',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '開課時間',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '結課時間',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => {
        return (
            <span>
          {tags.map((tag: any) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                  color = 'volcano';
              }
              return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
        );
    },
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}, {
    key: '4',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}, {
    key: '6',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}, {
    key: '8',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}, {
    key: '10',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: "11",
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}, {
    key: '12',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '13',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];


export class StatisticsDisplay extends React.Component<IStatisticsDisplayProps, IStatisticsDisplayState> {

    public constructor(props: IStatisticsDisplayProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div style={{marginBottom: 100}}>
                    <h1>概述</h1>
                    <Divider/>
                    <Row type="flex" justify="space-around" align="middle" style={{marginBottom: 20}}>
                        <Col span={4}>
                            <Statistic title="創建課程數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="發佈課程數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="總選課人數" value={1893}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={4}>
                            <Statistic title="上傳課件數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="發佈作業數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="討論區留言數" value={1893}/>
                        </Col>
                    </Row>
                </div>
                <div style={{marginBottom: 100}}>
                    <h1>按學期統計</h1>
                    <Divider/>
                    <h2 style={{marginBottom: 25}}>2018學年上學期</h2>
                    <Row style={{marginBottom: 25}} type="flex" justify="space-around" align="middle">
                        <Col span={4}>
                            <Statistic title="創建課程數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="發表課程數量" value={1893}/>
                        </Col>
                        <Col span={4}>
                            <Statistic title="總選課人數" value={1893}/>
                        </Col>
                    </Row>
                    <Table scroll={{y: true}} showHeader={true} title={() => "課程發佈列表"} columns={columns2}
                           dataSource={data}/>
                </div>
                <div style={{marginBottom: 100}}>
                    <h1>按課程統計</h1>
                    <Divider/>
                    {
                        this.getReleasementList().map((releasement: IReleasement) => {
                            return (
                                <div style={{marginBottom: 50}} key={releasement.rid}>
                                    <h2>{releasement.courseEntity.name}</h2>
                                    <Row type="flex" justify="space-around" align="middle">
                                        <Col span={4}>
                                            <Statistic title="選課人數" value={1893}/>
                                        </Col>
                                        <Col span={4}>
                                            <Statistic title="作業總提交人數" value={1893}/>
                                        </Col>
                                        <Col span={4}>
                                            <Statistic title="課件總下載次數" value={1893}/>
                                        </Col>
                                        <Col span={4}>
                                            <Statistic title="討論區總留言數" value={1893}/>
                                        </Col>
                                    </Row>
                                    <Table scroll={{y: true}} showHeader={true} title={() => "選課學生列表"} columns={columns}
                                           dataSource={data}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    private getReleasementList(): IReleasement[] {
        const {userType, forTeacher} = this.props;
        if (userType === "teacher" && forTeacher)
            return forTeacher.releasementList;
        throw new Error();
    }
}