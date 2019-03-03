import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon, Layout, Menu} from "antd";

export interface IAdminSiderProps {
}


export const AdminSider: React.FunctionComponent<IAdminSiderProps> = (props: IAdminSiderProps) => {
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
                <Menu.Item key={"course"}>
                    <NavLink exact={true} to="/approval/course">
                        <Icon type="book"/>審批課程
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={"calendar"}>
                    <NavLink exact={true} to="/approval/releasement">
                        <Icon type="setting"/>審批課程發佈
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={"statistics"}>
                    <NavLink exact={true} to="/statistics">
                        <Icon type="area-chart"/>統計信息
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};