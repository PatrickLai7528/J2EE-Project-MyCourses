import * as React from "react";
import {Component} from "react";
import './StudentSider.css';
import {Icon, Layout, Menu} from 'antd';
import {ICompetitionType} from "../../api/CompetitionTypeAPI";
import {NavLink} from "react-router-dom";
import IAPIResponse from "../../api/IAPIResponse";
import {ISelection} from "../../types/entities";
import {UserType} from "../../api/UserAPI";
import SelectionAPI from "../../api/SelectionAPI";

export interface IStudentSiderProps {
    userType: UserType,
    email: string | undefined
    selectionList: ISelection[]
}

interface IStudentSiderState {
    types: ICompetitionType[];
    isCollapsed: boolean;
    isLoading: boolean
}


export default class StudentSider extends Component<IStudentSiderProps, IStudentSiderState> {
    public constructor(props: IStudentSiderProps) {
        super(props);
        this.state = {
            types: [],
            isCollapsed: true,
            isLoading: false
        }
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
                            <Icon type="setting"/>個人檔案
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={"releasementAll"}>
                        <NavLink exact={true} to="/releasement/all">
                            <Icon type="book"/>所有課程
                        </NavLink>
                    </Menu.Item>
                    <Menu.SubMenu key="types" title={<span><Icon type="profile"/>已選課程</span>}>
                        {
                            !this.props.email || this.props.userType !== "student" ?
                                (
                                    <Menu.Item disabled={true}>
                                        尚未登入
                                    </Menu.Item>
                                ) : ""
                        }
                        {
                            this.props.selectionList.map((selection: ISelection) => {
                                return (
                                    <Menu.Item key={selection.slid}>
                                        <NavLink to={"/display/"}/>{selection.releasementEntity.courseEntity.name}
                                    </Menu.Item>)
                            })
                        }
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
        );
    }
}
