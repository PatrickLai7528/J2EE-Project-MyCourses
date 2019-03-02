import * as React from "react";
import TextArea from "antd/lib/input/TextArea";

export interface IEmailOperationFormProps {
    isTimeToSubmit: boolean
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
                <TextArea placeholder="請輸入內容" autosize onBlur={(e: any) => this.setState({content: e.target.value})}/>
            </div>
        )
    }

    private submit(): void {

    }
}