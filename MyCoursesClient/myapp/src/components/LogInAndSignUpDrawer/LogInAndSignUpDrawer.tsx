import * as React from "react";
import {Button, Drawer, Spin, message} from "antd";
import WrappedLogInForm, {LogInForm} from "../LogInForm/LogInForm";
import WrappedSignUpForm, {SignUpForm} from "../SignUpForm/SignUpForm";
import UserAPI from "../../api/UserAPI";
import Cookies from 'universal-cookie';
import IAPIResponse from "../../api/IAPIResponse";

export interface ILogInAndSignUpProps {
    visible: boolean
    onClose: () => void
}

enum Mode {
    LOG_IN, SIGN_UP
}

interface ILogInAndSignUpState {
    visible: boolean,
    logInOrSignUp: Mode
    isSubmitting: boolean,
}

export default class LogInAndSignUpDrawer extends React.Component<ILogInAndSignUpProps, ILogInAndSignUpState> {
    private logInForm: LogInForm | undefined = undefined;
    private signUpForm: SignUpForm | undefined = undefined;

    public constructor(props: ILogInAndSignUpProps) {
        super(props);
        this.state = {
            visible: props.visible,
            logInOrSignUp: Mode.LOG_IN,
            isSubmitting: false
        }
    }

    private submitLogin(): void {
        if (this.logInForm) {
            console.log(this.logInForm.props.form);
            this.logInForm.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        this.setState({isSubmitting: true});
                        console.log(values);
                        const {email, password} = values;
                        const loginData = {email, password};
                        UserAPI.getInstance().postLogin(loginData).then((response: IAPIResponse) => {
                            console.log(response);
                            if (response.isSuccess) {
                                message.success(response.message);
                                const cookie: Cookies = new Cookies();
                                cookie.set("token", response.resultBody.token);
                            } else {
                                message.error(response.message);
                            }
                            this.setState({isSubmitting: false});
                            this.props.onClose();
                        }).catch((e: any) => {
                            console.log(e);
                            this.setState({isSubmitting: false});
                        });
                    } else {
                    }
                }
            );
        }
    }

    private submitSignUp(): void {
        if (this.signUpForm) {
            this.signUpForm.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        this.setState({isSubmitting: true});
                        console.log(values);
                        const {email, password, number, name, userType} = values;
                        const signUpData = {email, password, number, name, userType};
                        UserAPI.getInstance().postSignUp(signUpData).then((response: IAPIResponse) => {
                            console.log(response);
                            if (response.isSuccess) {
                                message.success(response.message);
                            } else {
                                message.error(response.message);
                            }
                            this.setState({logInOrSignUp: Mode.LOG_IN});
                            this.setState({isSubmitting: false});
                        }).catch(e => {
                            console.log(e);
                            this.setState({isSubmitting: false});
                        });
                    } else {
                    }
                }
            );
        }


    }

    private submit(): void {
        if (this.state.isSubmitting)
            return;
        switch (this.state.logInOrSignUp) {
            case Mode.LOG_IN:
                this.submitLogin();
                break;
            case Mode.SIGN_UP:
                this.submitSignUp();
                break;
            default:
                throw new Error("Should not be here");
        }
    }

    private switchMode(): void {
        if (this.state.logInOrSignUp === Mode.LOG_IN
        ) {
            this.setState({logInOrSignUp: Mode.SIGN_UP});
        } else {
            this.setState({logInOrSignUp: Mode.LOG_IN});
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Drawer
                    title={
                        this.state.logInOrSignUp === Mode.LOG_IN ? "登錄" : "註冊"
                    }
                    width={480}
                    placement={"right"}
                    onClose={this.props.onClose}
                    maskClosable={false}
                    visible={this.state.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Spin spinning={this.state.isSubmitting}>
                        {

                            this.state.logInOrSignUp === Mode.LOG_IN ?
                                <WrappedLogInForm wrappedComponentRef={(form: LogInForm) => {
                                    this.logInForm = form;
                                }}/>
                                :
                                <WrappedSignUpForm wrappedComponentRef={(form: SignUpForm) => {
                                    this.signUpForm = form;
                                }}/>

                        }
                    </Spin>
                    < div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                            zIndex: 2
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={this.switchMode.bind(this)}>
                            {this.state.logInOrSignUp === Mode.LOG_IN ? "馬上註冊" : "已有帳戶"}
                        </Button>
                        <Button htmlType="button" onClick={this.submit.bind(this)}
                                style={{marginLeft: "15px"}}
                                type="primary">{this.state.logInOrSignUp === Mode.LOG_IN ? "登入" : "註冊"}</Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}