import * as React from "react";
import './StudentSider.css';
import {Icon, Layout, Menu} from 'antd';
import {NavLink} from "react-router-dom";
import {ISelection} from "../../types/entities";
import {UserStateProps} from "../App/GeneralProps";

const moment = require("moment");

export interface IStudentSiderProps extends UserStateProps {
    selectionList: ISelection[]

    onSelectionClick: (selection: ISelection) => void
}


const StudentSider: React.FunctionComponent<IStudentSiderProps> = (props: IStudentSiderProps) => {
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
                    {
                        props.selectionList.length === 0 ?
                            (
                                <Menu.Item disabled={true}>沒有數據</Menu.Item>
                            ) : ""
                    }
                    {
                        props.selectionList.map((selection: ISelection) => {
                            return (
                                <Menu.Item key={selection.slid}
                                           onClick={() => {
                                               console.log("click selection")
                                               props.onSelectionClick(selection)
                                           }}
                                >
                                    <NavLink
                                        to={"/selection/display"}/>{moment(selection.releasementEntity.effectiveTime).format("YYYY-MM") + " " + selection.releasementEntity.courseEntity.name}
                                </Menu.Item>)
                        })
                    }
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
    );
};

export default StudentSider;