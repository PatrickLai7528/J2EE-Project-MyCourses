import * as React from "react";
import {ITeacher} from "../../types/entities";
import {Button, Form, Icon, Input, message, Spin, Tooltip} from "antd";
import {IAppForTeacherState} from "../App/App";
import UserAPI from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {FormComponentProps} from "antd/lib/form";

export interface ITeacherProfileProps extends FormComponentProps {
    forTeacher: IAppForTeacherState
}

interface ITeacherProfileState {
    teacher?: ITeacher
    editable: boolean
    confirmLoading: boolean
}

class TeacherProfile extends React.Component<ITeacherProfileProps, ITeacherProfileState> {

    public constructor(props: ITeacherProfileProps) {
        super(props);
        this.state = {teacher: undefined, editable: false, confirmLoading: false}
    }

    public componentWillMount(): void {
        UserAPI.getInstance().getTeacherByEmail(this.props.forTeacher.email)
            .then((response: IAPIResponse<ITeacher>) => {
                if (response.isSuccess)
                    this.setState({teacher: response.payload});
            })
            .catch((e: any) => {
                console.log(e);
            })
    }


    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        const {teacher} = this.state;
        return (
            <div>
                <Spin spinning={teacher === undefined}>
                    <Form layout={'horizontal'}>
                        <Form.Item label="郵箱">
                            <Tooltip placement="topLeft" title="郵箱不可修改">
                                <label>{teacher ? teacher.teacherEmail : ""}</label>
                            </Tooltip>
                        </Form.Item>
                        <Form.Item label="姓名">
                            {
                                this.state.editable ?
                                    getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    whitespace: true, message: "不能有空白字符"
                                                }
                                            ],
                                        }
                                    )(
                                        <Input placeholder={teacher ? teacher.name : ""}/>
                                    )
                                    :
                                    <label>{teacher ? teacher.name : ""}</label>
                            }
                        </Form.Item>
                        <Form.Item label="教師編號">
                            {
                                this.state.editable ?
                                    getFieldDecorator('teacherNo', {
                                            rules: [
                                                {
                                                    whitespace: true, message: "不能有空白字符"
                                                }
                                            ],
                                        }
                                    )(
                                        <Input placeholder={teacher ? teacher.teacherNo : ""}/>)
                                    :
                                    <label>{teacher ? teacher.teacherNo : ""}</label>
                            }
                        </Form.Item>
                        {
                            this.state.editable ?
                                (
                                    <div>
                                        <Form.Item label="輸入舊密碼">
                                            {getFieldDecorator('oldPassword', {
                                                    rules: [
                                                        {
                                                            whitespace: true, message: "不能有空白字符"
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input type={"password"}/>)
                                            }
                                        </Form.Item>
                                        <Form.Item label="輸入新密碼">
                                            {getFieldDecorator('newPassword', {
                                                    rules: [
                                                        {
                                                            whitespace: true, message: "不能有空白字符"
                                                        }
                                                    ],
                                                }
                                            )(
                                                <Input type={"password"}/>)
                                            }
                                        </Form.Item>
                                    </div>
                                ) : ""
                        }
                    </Form>
                    {
                        this.state.editable &&
                        <Button type={"primary"} htmlType={"button"} style={{marginRight: 15}} onClick={() => {
                            this.submit();
                        }}>提交</Button>
                    }

                    <Button type={"primary"} htmlType={"button"}
                            onClick={() => this.setState({editable: true})}>修改個人資料</Button>
                </Spin>
            </div>
        )
    }

    private submit(): void {
        if (this.props.form) {
            this.props.form.validateFields((err: any, values: any) => {
                if (!err) {
                    console.log(values);
                    const {name, teacherNo, newPassword, oldPassword} = values;
                    if (newPassword && !oldPassword) {
                        message.warning("修改密碼需要提供舊密碼");
                        return;
                    }

                    UserAPI.getInstance().updateTeacher({
                        email: this.props.forTeacher.email,
                        teacherNo,
                        newPassword,
                        oldPassword,
                        name
                    })
                        .then((response: IAPIResponse<ITeacher>) => {
                            if (response.isSuccess) {
                                message.success(response.message);
                                this.setState({teacher: response.payload})
                            } else
                                message.error(response.message);
                        })
                        .catch((e: any) => {
                            console.log(e);
                            message.error("發生未知錯誤，請稍候再試")
                        })
                        .finally(() => this.setState({confirmLoading: false, editable: false}))
                }
            })
        }
    }
}

export const WrappedTeacherProfile = Form.create()(TeacherProfile);