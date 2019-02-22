import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon, Layout, Menu} from "antd";
import {UserType} from "../../api/UserAPI";

export interface ITeacherSiderProps {
    userType: UserType,
    email: string | undefined
}

interface ITeacherSiderState {
}

export default class TeacherSider extends React.Component<ITeacherSiderProps, ITeacherSiderState> {
    public render(): React.ReactNode {
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
                    <Menu.Item key={"course"}>
                        <NavLink exact={true} to="/course/all">
                            <Icon type="book"/>待發佈課程
                        </NavLink>
                    </Menu.Item>
                    <Menu.SubMenu key="types" title={<span><Icon type="profile"/>已發佈課程</span>}>
                        {
                            !this.props.email || this.props.userType !== "student" ?
                                (
                                    <Menu.Item disabled={true}>
                                        尚未登入
                                    </Menu.Item>
                                ) : ""
                        }
                        {/*{*/}
                        {/*this.props.selectionList.map((selection: ISelection) => {*/}
                        {/*return (*/}
                        {/*<Menu.Item key={selection.slid}>*/}
                        {/*<NavLink to={"/display/"}/>{selection.releasementEntity.courseEntity.name}*/}
                        {/*</Menu.Item>)*/}
                        {/*})*/}
                        {/*}*/}
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
        );
    }
}