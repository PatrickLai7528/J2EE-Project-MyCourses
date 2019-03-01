import * as React from "react";
import {Icon, Layout, Menu} from 'antd';
import {NavLink} from "react-router-dom";


export interface IVisitorSiderProps {
}


const VisitorSider: React.FunctionComponent<IVisitorSiderProps> = (props: IVisitorSiderProps) => {
    return (
        <Layout.Sider theme={"light"}
                      collapsible={true}
                      width={250}
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
                    <Menu.Item disabled={true}>
                        尚未登入
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
    );
};

export default VisitorSider;