import * as React from "react";
import {Component} from "react";
import './MyHeader.css';
import {Button, Layout, Menu} from 'antd';
import CompetitionAddingDrawer from "../CompetitionAddingDrawer/CompetitionAddingDrawer";
import LogInAndSignUpDrawer from "../LogInAndSignUpDrawer/LogInAndSignUpDrawer";
import logoUrl from "../../images/ac_logo.jpg";
import {NavLink} from "react-router-dom";

interface IMyHeaderState {
    enableAddingDrawer: boolean;
    enabledLogInDrawer: boolean;
}

export default class MyHeader extends Component<any, IMyHeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            enableAddingDrawer: false,
            enabledLogInDrawer: false
        }
    }

    private openCompetitionAddingDrawer(): void {
        this.setState({enableAddingDrawer: true})
    }

    private closeCompetitionAddingDrawer(): void {
        this.setState({enableAddingDrawer: false});
    }

    private closeLogInDrawer(): void {
        this.setState({enabledLogInDrawer: false})
    }

    render() {
        return (
            <Layout.Header>
                <div className="header__box">
                    <div className="logo__box">
                        <NavLink to={"/home"}>
                            <img width={"150px"} src={logoUrl} alt={"logo"}/>
                        </NavLink>
                    </div>
                    <div className="actions__box">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px', textAlign: "right"}}
                            selectable={false}
                        >
                            <Menu.Item key="1">
                                <Button type="primary" icon="upload"
                                        onClick={this.openCompetitionAddingDrawer.bind(this)} htmlType={"button"}>
                                    發佈比賽
                                </Button>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Button type="primary" icon="login"
                                        onClick={() => {
                                            this.setState({enabledLogInDrawer: true})
                                        }} htmlType={"button"}>
                                    登入
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                {
                    this.state.enableAddingDrawer ?
                        <CompetitionAddingDrawer
                            visible={this.state.enableAddingDrawer}
                            onClose={this.closeCompetitionAddingDrawer.bind(this)}
                        /> : ""
                }
                {
                    this.state.enabledLogInDrawer ?
                        <LogInAndSignUpDrawer
                            visible={this.state.enabledLogInDrawer}
                            onClose={this.closeLogInDrawer.bind(this)}
                        /> : ""
                }
            </Layout.Header>
        );
    }
}

