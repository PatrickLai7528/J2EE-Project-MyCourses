import * as React from "react";
import {Component} from "react";
import './MySider.css';
import {Icon, Layout, Menu} from 'antd';
import {CompetitionTypeAPI, ICompetitionType} from "../../api/CompetitionTypeAPI";
import {NavLink} from "react-router-dom";
import IAPIResponse from "../../api/IAPIResponse";

interface IMySiderState {
    types: ICompetitionType[];
    isCollapsed: boolean;
}


export default class MySider extends Component<any, IMySiderState> {
    public constructor(props: any) {
        super(props);
        this.state = {types: [], isCollapsed: true}
    }

    public async componentDidMount() {
        const response: IAPIResponse = await CompetitionTypeAPI.getInstance().get();
        if (response && response.isSuccess) {
            this.setState({types: response.resultBody})
        }
        // CompetitionTypeAPI.getInstance().get().then((response: IAPIResponse) => {
        //     if (response.isSuccess) {
        //         this.setState({types: response.resultBody});
        //     }
        // }).catch((e: any) => {
        //     console.log(e);
        // })
    }


    render() {
        return (
            <Layout.Sider style={{background: '#fff'}}
                          collapsible={true}
                          collapsedWidth={0}
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={["types"]}
                    // style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item key={"calendar"}>
                        <NavLink exact={true} to="/calendar">
                            <Icon type="calendar"/>比賽日曆
                        </NavLink>
                    </Menu.Item>
                    <Menu.SubMenu key="types" title={<span><Icon type="profile"/>比賽類型</span>}>
                        <Menu.Item key="0">
                            <NavLink exact={true} to="/display/all">
                                全部
                            </NavLink>
                        </Menu.Item>
                        {
                            this.state.types.map((type: ICompetitionType, index: number) => {
                                return (
                                    <Menu.Item key={index + 1}>
                                        <NavLink to={"/display/" + type.english}/>{type.chinese}
                                    </Menu.Item>)
                            })
                        }
                    </Menu.SubMenu>
                    <Menu.Item key="crawled" disabled={true}>
                        <NavLink exact={true} to="#">
                            <Icon type="branches"/>來自爬蟲
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="profile" disabled={true}>
                        <NavLink exact={true} to="/setting">
                            <Icon type="setting"/>設定
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        );
    }
}

