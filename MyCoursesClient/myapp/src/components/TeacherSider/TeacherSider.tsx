import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon, Layout, Menu} from "antd";
import {UserType} from "../../api/UserAPI";
import {IReleasement} from "../../types/entities";

const moment = require("moment");

export interface ITeacherSiderProps {
    userType: UserType,
    email: string | undefined
    releasementList: IReleasement[]
    onReleasementClick: (releasement: IReleasement) => void;
}

interface ITeacherSiderState {
}

export default class TeacherSider extends React.Component<ITeacherSiderProps, ITeacherSiderState> {
    public render(): React.ReactNode {
        return (
            <Layout.Sider
                theme={"light"}
                collapsible={true}
                collapsedWidth={0}
                width={250}
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
                            !this.props.email || this.props.userType !== "teacher" ?
                                (
                                    <Menu.Item disabled={true}>
                                        尚未登入
                                    </Menu.Item>
                                ) : ""

                        }
                        {
                            this.props.releasementList.length === 0 ?
                                (
                                    <Menu.Item disabled={true}>沒有數據</Menu.Item>
                                ) : ""
                        }
                        {
                            this.props.releasementList.map((releasement: IReleasement) => {
                                return (
                                    <Menu.Item key={releasement.rid}
                                               onClick={() => {
                                                   this.props.onReleasementClick(releasement)
                                               }}>
                                        <NavLink to={"/releasement/manage"}>
                                            {moment(releasement.effectiveTime).format("MM-DD") + " " + releasement.courseEntity.name}
                                        </NavLink>
                                    </Menu.Item>
                                )
                            })
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