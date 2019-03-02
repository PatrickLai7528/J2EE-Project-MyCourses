import * as React from "react";
import {AssignmentSubmitForm, WrappedAssignmentSubmitForm} from "./AssignmentSubmitForm";
import {IAssignment, ISelection} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendSubmissionProps} from "../App/GeneralProps";
import {ISendSubmissionData} from "../../api/AssignmentAPI";

export interface IAssignmentSubmitFormContainerProps extends ISendSubmissionProps {
    isTimeToSubmit: boolean

    selection: ISelection
    assignment: IAssignment

    email: string

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void
}

interface IAssignmentSubmitFormContainerState {
    // try to put it here, see what will happen
    // form?: AssignmentSubmitForm
}

export class AssignmentSubmitFormContainer extends React.Component<IAssignmentSubmitFormContainerProps, IAssignmentSubmitFormContainerState> {
    private form: AssignmentSubmitForm | undefined;

    public constructor(props: IAssignmentSubmitFormContainerProps) {
        super(props);
        this.state = {}
    }

    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let {assignment} = values;
                        console.log(values);
                        const sendSubmissionData: ISendSubmissionData = {
                            fileName: assignment,
                            email: this.props.email,
                            assid: this.props.assignment.assid,
                            slid: this.props.selection.slid
                        };
                        this.props.sendSubmission(sendSubmissionData,
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

    public componentWillReceiveProps(nextProps: Readonly<IAssignmentSubmitFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit) {
            this.submit();
        }
    }

    public render(): React.ReactNode {
        return (
            <WrappedAssignmentSubmitForm
                wrappedComponentRef={(form: AssignmentSubmitForm) => {
                    this.form = form;
                }}/>
        )
    }

}