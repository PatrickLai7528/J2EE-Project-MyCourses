import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon, Layout, Menu} from "antd";
import {IReleasement} from "../../types/entities";
import {AppContextConsumer} from "../App/App";
import {IAppContext} from "../../store/AppContext";
import {NavigateReducer} from "../../reducers/NavigateReducer";

const moment = require("moment");

// export interface ITeacherSiderProps extends UserStateProps {
//     releasementList: IReleasement[]
//     onReleasementClick: (releasement: IReleasement) => void;
// }


export const TeacherSider: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                (props: IAppContext) => {
                    if (props.userType === "teacher" && props.forTeacher) {
                        const {releasementList} = props.forTeacher;
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
                                            releasementList.map((releasement: IReleasement) => {
                                                return (
                                                    <Menu.Item key={releasement.rid}
                                                               onClick={() => props.superRefresh(NavigateReducer.navigateReleasementTo(props, {releasement}))}>
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
                        )
                    }
                }
            }
        </AppContextConsumer>
    );
};