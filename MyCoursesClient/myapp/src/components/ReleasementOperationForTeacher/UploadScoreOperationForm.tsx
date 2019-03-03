import * as React from "react";
import {IReleasement, ISelection} from "../../types/entities";
import SelectionAPI from "../../api/SelectionAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {FormComponentProps} from "antd/lib/form";
import {Empty, Form, Input, InputNumber, message, Tooltip} from "antd";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {toByteUnit} from "../../types/enums";
import ReleasementAPI, {ISendScoreData} from "../../api/ReleasementAPI";

export interface IUploadScoreOperationFormProps extends FormComponentProps {
    releasement: IReleasement
    isTimeToSubmit: boolean
    onSendBefore: () => void
    onSendAfter: () => void
}

interface IUploadScoreOperationFormState {
    selectionList: ISelection[]
}

class UploadScoreOperationForm extends React.Component<IUploadScoreOperationFormProps, IUploadScoreOperationFormState> {
    public constructor(props: IUploadScoreOperationFormProps) {
        super(props);
        this.state = {
            selectionList: []
        }
    }

    public componentWillMount(): void {
        SelectionAPI.getInstance().getSelectionOfReleasement(this.props.releasement.rid)
            .then((response: IAPIResponse<ISelection[]>) => {
                if (response.isSuccess && response.payload)
                    this.setState({selectionList: response.payload})
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    public componentWillReceiveProps(nextProps: Readonly<IUploadScoreOperationFormProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit) {
            this.submit();
        }
    }

    public render(): React.ReactNode {
        return (
            <Form
                hideRequiredMark={true}
                layout={"inline"}
            >
                {
                    (!this.state.selectionList || this.state.selectionList.length === 0) ?
                        <Empty/> : this.state.selectionList.map((selection: ISelection) => {
                            return (
                                <Form.Item
                                    key={selection.slid}
                                    label={"學號" + selection.studentEntity.studentNo + "的成績"}
                                >
                                    {this.props.form.getFieldDecorator(String(selection.slid), {
                                        rules: [
                                            {
                                                required: true, message: '成績不能為空',
                                            }
                                        ],
                                    })(
                                        <InputNumber placeholder={selection.score === undefined ? "成績" : "已有成績"} min={0}
                                                     max={100}
                                                     disabled={selection.score !== undefined}/>
                                    )}
                                </Form.Item>
                            )
                        })
                }
            </Form>
        )
    }

    private submit(): void {
        if (this.props.form) {
            this.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let dataList: ISendScoreData[] = [];
                        for (let selection of this.state.selectionList) {
                            dataList.push({
                                slid: selection.slid,
                                score: values[selection.slid]
                            })
                        }
                        this.props.onSendBefore();
                        ReleasementAPI.getInstance().sendScores(dataList)
                            .then((response: IAPIResponse<any>) => {
                                if (response.isSuccess)
                                    message.success(response.message);
                                else
                                    message.error(response.message);
                            })
                            .catch((e: any) => {
                                message.error("發生未知錯誤，請稍候再試")
                            })
                            .finally(() => {
                                this.props.onSendAfter();
                            })
                        //     let {title, description, ddl, fileSize, byteUnit, attachment} = values;
                        //     description = description.replace("\n", "%0A");
                        //     const sendAssignmentData: ISendAssignmentData = {
                        //         title,
                        //         description,
                        //         rid: this.props.releasement.rid,
                        //         ddl: ddl.format("YYYY-MM-DD"),
                        //         fileSize,
                        //         byteUnit: toByteUnit(byteUnit),
                        //         fileName: attachment
                        //     };
                        //     this.props.sendAssignment(sendAssignmentData,
                        //         {
                        //             onBefore: this.props.onSendBefore,
                        //             onSuccess: this.props.onSendSuccess,
                        //             onFail: this.props.onSendFail,
                        //             onError: this.props.onSendError
                        //         })
                    }
                }
            );
        }
    }
}

export const WrappedUploadScoreOperationForm = Form.create()(UploadScoreOperationForm);
//
// export interface IUploadScoreOperationFormContainerProps{
//
// }
//
// interface IUploadScoreOperationFormContainterState {
//
// }
//
// export class UploadScoreOperationFormContainer extends React.Component<IUploadScoreOperationFormContainerProps, IUploadScoreOperationFormContainterState>{
//     public constructor(props:IUploadScoreOperationFormContainerProps){
//         super(props);
//     }
//
//     public render(): React.ReactNode {
//         return
//     }
//
// }