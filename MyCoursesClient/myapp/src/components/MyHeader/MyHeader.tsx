import * as React from "react";
import {Component} from "react";
import './MyHeader.css';
import {Button, Layout, Menu} from 'antd';
import LogInAndSignUpDrawer from "../LogInAndSignUpDrawer/LogInAndSignUpDrawer";
import {UserType} from "../../api/UserAPI";
import {AppContext} from "../App/App";
import {IAppContext} from "../../store/AppContext";

export interface IMyHeaderProps {
    // userType: UserType
    // email?: string
    /**
     * called while login success without error
     * @param userType
     * @param email
     */
    onLogInSuccess: (userType: UserType, email: string, token: string) => void

    /**
     * called while login failed without error
     */
    onLogInFail: () => void

    /**
     * called while login failed with error
     */
    onLogInError: () => void

    /**
     * call while sign up success without error
     */
    onSignUpSuccess: () => void

    /**
     * call while sign up fail without error
     */
    onSignUpFail: () => void

    /**
     * call while sign up fail with error
     */
    onSignUpError: () => void
}

interface IMyHeaderState {
    // enableAddingDrawer: boolean;
    enabledLogInDrawer: boolean;
}

export default class MyHeader extends Component<IMyHeaderProps, IMyHeaderState> {
    constructor(props: IMyHeaderProps) {
        super(props);
        this.state = {
            enabledLogInDrawer: false
        }
    }

    private closeLogInDrawer(): void {
        this.setState({enabledLogInDrawer: false})
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    (props: IAppContext) => {
                        console.log(props);
                        return (
                            <Layout.Header>
                                <div className="header__box">
                                    <div className="actions__box">
                                        <Menu
                                            theme="dark"
                                            mode="horizontal"
                                            style={{lineHeight: '64px', textAlign: "right"}}
                                            selectable={false}
                                        >
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
                                    this.state.enabledLogInDrawer ?
                                        <LogInAndSignUpDrawer

                                            onLogInSuccess={this.props.onLogInSuccess}
                                            onLogInFail={this.props.onLogInFail}
                                            onLogInError={this.props.onLogInError}

                                            onSignUpSuccess={this.props.onSignUpSuccess}
                                            onSignUpFail={this.props.onSignUpFail}
                                            onSignUpError={this.props.onSignUpError}

                                            visible={this.state.enabledLogInDrawer}
                                            onClose={this.closeLogInDrawer.bind(this)}
                                        /> : ""
                                }
                            </Layout.Header>
                        )
                    }
                }
            </AppContext.Consumer>
        );
    }
}

