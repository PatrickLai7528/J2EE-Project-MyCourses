import * as React from "react";
import {AssignmentAddingForm, WrappedAssignmentAddingForm} from "./AssignmentAddingForm";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {IReleasement} from "../../types/entities";
import {toByteUnit} from "../../types/enums";
import {ISendAssignmentProps} from "../App/GeneralProps";

export interface IAssignmentAddingFormContainerProps extends ISendAssignmentProps {
    isTimeToSubmit: boolean

    releasement: IReleasement

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void
    refreshFormTrigger: boolean
}

interface IAssignmentAddingFormContainerState {
}

export class AssignmentAddingFormContainer extends React.Component<IAssignmentAddingFormContainerProps, IAssignmentAddingFormContainerState> {
    private form: AssignmentAddingForm | undefined;

    public constructor(props: IAssignmentAddingFormContainerProps) {
        super(props);
    }

    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let {title, description, ddl, fileSize, byteUnit, attachment} = values;
                        console.log(values);
                        description = description.replace("\n", "%0A");
                        const sendAssignmentData: ISendAssignmentData = {
                            title,
                            description,
                            rid: this.props.releasement.rid,
                            ddl: ddl.format("YYYY-MM-DD"),
                            fileSize,
                            byteUnit: toByteUnit(byteUnit),
                            fileName: attachment
                        };
                        this.props.sendAssignment(sendAssignmentData,
                            {
                                onBefore: this.props.onSendBefore,
                                onSuccess: this.props.onSendSuccess,
                                onFail: this.props.onSendFail,
                                onError: this.props.onSendError
                            })
                    }
                }
            );
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IAssignmentAddingFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit)
            this.submit();
    }

    public render(): React.ReactNode {
        return (
            <WrappedAssignmentAddingForm resetTrigger={this.props.refreshFormTrigger}
                                         wrappedComponentRef={(form: AssignmentAddingForm) => {
                                             this.form = form;
                                         }}/>
        )
    }
}