import * as React from "react";
import {GetFieldDecoratorOptions, ValidationRule} from "antd/lib/form/Form";
import {Button, DatePicker, Form, Icon, Input, InputNumber, message, Radio, Tooltip, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {IGeneralReleaseCourseFormItemProps} from "../ReleaseCourseForm/ReleaseCourseFormItem";
import RadioGroup from "antd/lib/radio/group";
import AssignmentAPI from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";

export interface IGeneralAssignmentAddingFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export const TitleAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="標題"
        >
            {props.getFieldDecorator('title', {
                rules: [
                    {
                        required: true, message: '標題不能為空',
                    }
                ],
            })(
                <Input placeholder={"標題"}/>
            )}
        </Form.Item>
    )
};

export const DescriptionAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="作業描述"
        >
            {props.getFieldDecorator('description', {
                rules: [
                    {
                        required: true, message: '作業描述不能為空',
                    }
                ],
            })(
                <TextArea placeholder="作業描述"
                          autosize={{minRows: 1, maxRows: 6}}/>
            )}
        </Form.Item>
    )
};
export const DDLAssignmentAddingFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item
            label="截止日期"
        >
            {
                props.getFieldDecorator('ddl', {
                        rules: [
                            {
                                required: true, message: '截止日期不能為空',
                            }
                        ],
                    }
                )(
                    <DatePicker placeholder="截止日期"/>
                )}
        </Form.Item>
    )
};

export interface IAttachmentAssignmentAddingFormItemProps extends IGeneralAssignmentAddingFormItemProps {
    setFieldsValue(obj: Object): void
}

interface IAttachmentAssignmentAddingFormItemState {
    fileList: any[]
    uploading: boolean
    isUploaded: boolean
}

export class AttachmentAssignmentAddingFormItem extends React.Component<IAttachmentAssignmentAddingFormItemProps, IAttachmentAssignmentAddingFormItemState> {

    public constructor(props: IAttachmentAssignmentAddingFormItemProps) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            isUploaded: false
        }
    }

    private beforeUpload(file: any): boolean {
        if (this.state.fileList.length != 0) {
            message.warn("只能上傳一個附件");
        } else {
            const {fileList} = this.state;
            fileList.push(file);
            this.setState({fileList});
        }
        return false; // false means stop antd's upload
    }

    private handleUploadClick(): void {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        this.setState({uploading: true});
        AssignmentAPI.getInstance().uploadAttachment(formData)
            .then((response: IAPIResponse<string>) => {
                if (response.isSuccess) {
                    message.success(response.message);
                    this.setState({isUploaded: true})
                    if (response.payload)
                        this.props.setFieldsValue({attachment: response.payload})
                } else {
                    message.error(response.message)
                }
                this.setState({uploading: false});
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試");
                this.setState({uploading: false})
            })
    }

    private handleRemove(): void {
        // only one file allowed
        this.setState({fileList: []})
    }

    private validateIsUpload(rule: ValidationRule, value: any, callback: (message?: string) => void): void {
        // selected a file but doesn't click the button to upload
        if (this.state.fileList.length === 1 && !this.state.isUploaded) {
            callback("請點擊上傳文件")
        } else {
            callback();
        }
    }

    public render(): React.ReactNode {
        return (
            <Form.Item
                label="附件"
            >
                {this.props.getFieldDecorator('attachment', {
                    rules: [
                        {
                            validator: this.validateIsUpload.bind(this)
                        }
                    ]

                })(
                    <div>
                        <Upload
                            onRemove={this.handleRemove.bind(this)}
                            fileList={this.state.fileList}
                            beforeUpload={this.beforeUpload.bind(this)}
                        >
                            <Tooltip placement="right" title="點擊下方按鈕上傳文件">
                                <a>選擇文件</a>
                            </Tooltip>
                        </Upload>
                        <Button disabled={this.state.fileList.length === 0} onClick={this.handleUploadClick.bind(this)}
                                loading={this.state.uploading}>
                            <Icon type="upload"/> 點擊上傳
                        </Button>
                    </div>
                )}

            </Form.Item>
        )
    }
}

export const ByteUnitAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="大小單位"
        >
            {
                props.getFieldDecorator('byteUnit', {
                        rules: [
                            {
                                required: true, message: '大小單位不能為空',
                            },
                        ],
                    }
                )(
                    <RadioGroup>
                        <Radio value="KB">KB</Radio>
                        <Radio value="MB">MB</Radio>
                        <Radio value="GB">GB</Radio>
                    </RadioGroup>
                )}
        </Form.Item>
    )
};

export const FileSizeLimitAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="文件大小限制"
        >
            {
                props.getFieldDecorator('fileSize', {
                        rules: [
                            {
                                required: true, message: '截止日期不能為空',
                            }
                        ],
                    }
                )(
                    <InputNumber placeholder="大小" min={1}/>
                )}
        </Form.Item>
    )
};
