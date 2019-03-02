import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import {message} from "antd";
import {EmailAPI} from "../../api/EmailAPI";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";

export interface IEmailOperationFormProps {
    isTimeToSubmit: boolean
    releasement: IReleasement
    onSendBefore: () => void
    onSendAfter: () => void
}

interface IEmailOperationFormState {
    content: string
}

export class EmailOperationForm extends React.Component<IEmailOperationFormProps, IEmailOperationFormState> {

    public constructor(props: IEmailOperationFormProps) {
        super(props);
        this.state = {content: ""}
    }

    public componentWillReceiveProps(nextProps: Readonly<IEmailOperationFormProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit) {
            this.submit();
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <TextArea wrap={"hard"} placeholder="請輸入內容" autosize
                          onBlur={(e: any) => this.setState({content: e.target.value})}/>
            </div>
        )
    }

    private submit(): void {
        if (!this.state.content || this.state.content.length === 0) {
            message.warn("內容不能為空");
            return;
        }

        this.props.onSendBefore();
        EmailAPI.getInstance().sendBroadCastEmail({rid: this.props.releasement.rid, content: this.state.content})
            .then((response: IAPIResponse<any>) => {
                if (response.isSuccess)
                    message.success(response.message);
                else
                    message.error(response.message);
            })
            .catch((e: any) => {
                console.warn(e);
                message.error("發送郵件錯誤，請稍候再試")
            })
            .finally(() => {
                this.props.onSendAfter();
            })
    }
}