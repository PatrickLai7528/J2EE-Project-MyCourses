import * as React from "react";
import './StudentSider.css';
import {Icon, Layout, Menu} from 'antd';
import {NavLink} from "react-router-dom";
import {ISelection} from "../../types/entities";
import {UserType} from "../../api/UserAPI";
import {UserStateProps} from "../App/GeneralProps";
import {AppContextConsumer} from "../App/App";
import {IAppContext} from "../../store/AppContext";
import {NavigateReducer} from "../../reducers/NavigateReducer";

const moment = require("moment");

// export interface IStudentSiderProps extends UserStateProps {
//     selectionList: ISelection[]
//
//     onSelectionClick: (selection: ISelection) => void
// }


const StudentSider: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                (props: IAppContext) => {
                    if ((props.userType === "student" || props.userType === "visitor") && props.forStudent) {
                        let {selectionList} = props.forStudent;
                        if (props.userType === "visitor" || !selectionList) {
                            selectionList = []
                        }
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
                                            selectionList.length === 0 ?
                                                (
                                                    <Menu.Item disabled={true}>沒有數據</Menu.Item>
                                                ) : ""
                                        }
                                        {
                                            selectionList.map((selection: ISelection) => {
                                                return (
                                                    <Menu.Item key={selection.slid}
                                                               onClick={() => props.superRefresh(NavigateReducer.navigateSelectionTo(props, {selection: selection}))}
                                                    >
                                                        <NavLink
                                                            to={"/selection/display"}/>{moment(selection.releasementEntity.effectiveTime).format("YYYY-MM") + " " + selection.releasementEntity.courseEntity.name}
                                                    </Menu.Item>)
                                            })
                                        }
                                    </Menu.SubMenu>
                                </Menu>
                            </Layout.Sider>
                        )
                    }
                }
            }
        </AppContextConsumer>
    );
};

export default StudentSider;