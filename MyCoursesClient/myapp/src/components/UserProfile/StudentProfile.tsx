import * as React from "react";
import {Button, Input, Spin, Tooltip, Form, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IStudent, ITeacher} from "../../types/entities";
import UserAPI from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {IAppForStudentState} from "../App/App";

export interface IStudentProfileProps extends FormComponentProps {
    forStudent: IAppForStudentState
}

interface IStudentProfileState {
    student?: IStudent
    editable: boolean
    confirmLoading: boolean
}

class StudentProfile extends React.Component<IStudentProfileProps, IStudentProfileState> {

    public constructor(props: IStudentProfileProps) {
        super(props);
        this.state = {
            editable: false, student: undefined, confirmLoading: false
        }
    }

    public componentWillMount(): void {
        UserAPI.getInstance().getStudentByEmail(this.props.forStudent.email)
            .then((response: IAPIResponse<IStudent>) => {
                if (response.isSuccess)
                    this.setState({student: response.payload});
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    public render(): React.ReactNode {
        const {student} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Spin spinning={student === undefined}>
                    <Form layout={'horizontal'}>
                        <Form.Item label="郵箱">
                            <Tooltip placement="topLeft" title="郵箱不可修改">
                                <label>{student ? student.studentEmail : ""}</label>
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
                                        <Input placeholder={student ? student.name : ""}/>
                                    )
                                    :
                                    <label>{student ? student.name : ""}</label>
                            }
                        </Form.Item>
                        <Form.Item label="學生編號">
                            {
                                this.state.editable ?
                                    getFieldDecorator('studentNo', {
                                            rules: [
                                                {
                                                    whitespace: true, message: "不能有空白字符"
                                                }
                                            ],
                                        }
                                    )(
                                        <Input placeholder={student ? student.studentNo : ""}/>)
                                    :
                                    <label>{student ? student.studentNo : ""}</label>
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

    private submit() {
        if (this.props.form) {
            this.props.form.validateFields((err: any, values: any) => {
                if (!err) {
                    console.log(values);
                    const {name, studentNo, newPassword, oldPassword} = values;
                    if (newPassword && !oldPassword) {
                        message.warning("修改密碼需要提供舊密碼");
                        return;
                    }

                    UserAPI.getInstance().updateStudent({
                        email: this.props.forStudent.email,
                        studentNo,
                        newPassword,
                        oldPassword,
                        name
                    })
                        .then((response: IAPIResponse<IStudent>) => {
                            if (response.isSuccess) {
                                message.success(response.message);
                                this.setState({student: response.payload})
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

export const WrappedStudentProfile = Form.create()(StudentProfile);