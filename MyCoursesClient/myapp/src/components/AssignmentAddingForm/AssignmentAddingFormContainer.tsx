import * as React from "react";
import {AssignmentAddingForm, WrappedAssignmentAddingForm} from "./AssignmentAddingForm";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {IReleasement} from "../../types/entities";

export interface IAssignmentAddingFormContainerProps {
    isTimeToSubmit: boolean

    releasement: IReleasement

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void
}

interface IAssignmentAddingFormContainerState {
}

export class AssignmentAddingFormContainer extends React.Component<IAssignmentAddingFormContainerProps, IAssignmentAddingFormContainerState> {
    private form: AssignmentAddingForm | undefined;

    public constructor(props: IAssignmentAddingFormContainerProps) {
        super(props);
        this.state = {};
    }

    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        const {title, description} = values;
                        const sendAssignmentData: ISendAssignmentData = {
                            title, description, rid: this.props.releasement.rid
                        };
                        this.props.sendAssignment(sendAssignmentData,
                            this.props.onSendBefore,
                            this.props.onSendSuccess,
                            this.props.onSendFail,
                            this.props.onSendError
                        )
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
            <WrappedAssignmentAddingForm wrappedComponentRef={(form: AssignmentAddingForm) => {
                this.form = form;
            }}/>
        )
    }
}