import * as React from "react";
import {GetFieldDecoratorOptions, ValidationRule} from "antd/lib/form/Form";
import {Button, Icon, message, Tooltip, Upload, Form, Input} from "antd";
import {} from "antd/lib/form";

export interface IGeneralSlideAddingFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export const TitleSlideAddingFormItem: React.FunctionComponent<IGeneralSlideAddingFormItemProps> = (props: IGeneralSlideAddingFormItemProps) => {
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

export interface IUploadSlideAddingFormItemProps extends IGeneralSlideAddingFormItemProps {
    setFieldsValue(obj: Object): void
}

export interface IUploadSlideAddingFormItemState {
    fileList: any[]
    uploading: boolean
    isUploaded: boolean
}

export class UploadSlideAddingFormItem extends React.Component<IUploadSlideAddingFormItemProps, IUploadSlideAddingFormItemState> {

    public constructor(props: IUploadSlideAddingFormItemProps) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            isUploaded: false
        }
    }

    private beforeUpload(file: any): boolean {
        if (this.state.fileList.length != 0) {
            message.warn("只能逐次上傳課件");
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
        // this.setState({uploading: true});
        // AssignmentAPI.getInstance().uploadAttachment(formData)
        //     .then((response: IAPIResponse<string>) => {
        //         if (response.isSuccess) {
        //             message.success(response.message);
        //             this.setState({isUploaded: true})
        //             if (response.payload)
        //                 this.props.setFieldsValue({attachment: response.payload})
        //         } else {
        //             message.error(response.message)
        //         }
        //         this.setState({uploading: false});
        //     })
        //     .catch((e: any) => {
        //         console.log(e);
        //         message.error("發生未知錯誤，請稍候再試");
        //         this.setState({uploading: false})
        //     })
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
                label="課件"
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