import {Icon, Layout, Menu} from "antd";
import React from "react";
import "./MySider.css"
import {AuthSiderItemContainer} from "../../containers/AuthSiderItemContainer/AuthSiderItemContainer";
import {SettingSiderItem} from "../SettingSiderItem/SettingSiderItem";

const {Sider} = Layout;
const MySider = () => (
    <Sider className={"mysider"}>
        <div className="logo"/>
        <Menu theme={"dark"} defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
                <AuthSiderItemContainer/>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="video-camera"/>
                <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="upload"/>
                <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
                <Icon type="bar-chart"/>
                <span className="nav-text">nav 4</span>
            </Menu.Item>
            <Menu.Item key="5">
                <Icon type="cloud-o"/>
                <span className="nav-text">nav 5</span>
            </Menu.Item>
            <Menu.Item key="6">
                <Icon type="appstore-o"/>
                <span className="nav-text">nav 6</span>
            </Menu.Item>
            <Menu.Item key="7">
                <Icon type="team"/>
                <span className="nav-text">nav 7</span>
            </Menu.Item>
            <Menu.Item key="8">
                <SettingSiderItem/>
            </Menu.Item>
        </Menu>
    </Sider>
);
export default MySider;