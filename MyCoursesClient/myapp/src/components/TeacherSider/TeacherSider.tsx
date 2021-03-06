import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon, Layout, Menu} from "antd";
import {IReleasement} from "../../types/entities";
import {UserStateProps} from "../App/SendActionProps";

const moment = require("moment");

export interface ITeacherSiderProps extends UserStateProps {
    releasementList: IReleasement[]
    onReleasementClick: (releasement: IReleasement) => void;
}


export const TeacherSider: React.FunctionComponent<ITeacherSiderProps> = (props: ITeacherSiderProps) => {
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
            >
                <Menu.Item key={"profile"}>
                    <NavLink exact={true} to="/profile">
                        <Icon type="user"/>個人資料
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={"course"}>
                    <NavLink exact={true} to="/course/all">
                        <Icon type="book"/>待發佈課程
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={"statistics"}>
                    <NavLink exact={true} to="/statistics">
                        <Icon type="area-chart"/>統計信息
                    </NavLink>
                </Menu.Item>
                <Menu.SubMenu key="types" title={<span><Icon type="profile"/>已發佈課程</span>}>
                    {
                        props.releasementList.length === 0 ?
                            (
                                <Menu.Item disabled={true}>沒有數據</Menu.Item>
                            ) : ""
                    }
                    {
                        props.releasementList.map((releasement: IReleasement) => {
                            return (
                                <Menu.Item key={releasement.rid}
                                           onClick={() => {
                                               props.onReleasementClick(releasement)
                                           }}>
                                    <NavLink to={"/releasement/manage"}>
                                        {moment(releasement.effectiveTime).format("YYYY-MM") + " " + releasement.courseEntity.name}
                                    </NavLink>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
    );
};