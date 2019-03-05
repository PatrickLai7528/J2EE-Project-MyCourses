import * as React from "react";
import {GetFieldDecoratorOptions, ValidationRule} from "antd/lib/form/Form";
import {Button, Form, Icon, message, Tooltip, Upload} from "antd";
import AssignmentAPI from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";

export interface IGeneralAssignmentSubmitFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export interface IAssignmentSubmitFormItemProps extends IGeneralAssignmentSubmitFormItemProps {
    setFieldsValue(obj: Object): void
}

interface IAssignmentSubmitFormItemState {
    fileList: any[]
    uploading: boolean
    isUploaded: boolean
}

export class AttachmentAssignmentAddingFormItem extends React.Component<IAssignmentSubmitFormItemProps, IAssignmentSubmitFormItemState> {

    public constructor(props: IAssignmentSubmitFormItemProps) {
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
        AssignmentAPI.getInstance().uploadSubmission(formData)
            .then((response: IAPIResponse<string>) => {
                if (response.isSuccess) {
                    message.success(response.message);
                    this.setState({isUploaded: true});
                    if (response.payload)
                        this.props.setFieldsValue({assignment: response.payload})
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
                label="作業"
            >
                {this.props.getFieldDecorator('assignment', {
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