import * as React from "react";
import {Button, Drawer, message, Spin} from "antd";
import {LogInForm, WrappedLogInForm} from "../LogInForm/LogInForm";
import WrappedSignUpForm, {SignUpForm} from "../SignUpForm/SignUpForm";
import UserAPI, {UserType} from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";

export interface ILogInAndSignUpProps {
    visible: boolean
    onClose: () => void

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

enum Mode {
    LOG_IN, SIGN_UP, LOG_OUT
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
            // console.log(this.logInForm.props.form);
            this.logInForm.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        this.setState({isSubmitting: true});
                        // console.log(values);
                        const {email, password, userType} = values;
                        const loginData = {email, password, userType};
                        UserAPI.getInstance().postLogin(loginData).then((response: IAPIResponse<any>) => {
                            // console.log(response);
                            if (response.isSuccess) {
                                console.log("log in response");
                                console.log(response);
                                message.success(response.message);
                                this.props.onLogInSuccess(userType, email, response.payload);
                                // DataStore.getInstance()
                                //     .put("userType", userType);
                                // if (userType === "student")
                                //     DataStore.getInstance().put("studentEmail", email);
                                // if (userType === "teacher")
                                //     DataStore.getInstance().put("teacherEmail", email);
                            } else {
                                this.props.onLogInFail();
                                message.error(response.message);
                            }
                            this.setState({isSubmitting: false});
                            this.props.onClose();
                        }).catch((e: any) => {
                            console.log(e);
                            this.props.onLogInError();
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
                        // console.log(values);
                        const {email, password, number, name, userType, verifyCode} = values;
                        const signUpData = {email, password, number, name, userType, verifyCode};
                        UserAPI.getInstance().postSignUp(signUpData).then((response: IAPIResponse<any>) => {
                            console.log(response);
                            if (response.isSuccess) {
                                message.success(response.message);
                                this.props.onSignUpSuccess();
                            } else {
                                message.error(response.message);
                                this.props.onSignUpFail();
                            }
                            this.setState({logInOrSignUp: Mode.LOG_IN});
                            this.setState({isSubmitting: false});
                        }).catch(e => {
                            console.log(e);
                            this.setState({isSubmitting: false});
                            this.props.onSignUpError();
                        });
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
                        height: 'calc(100% - 40px)',
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