import * as React from "react";
import {AssignmentAddingForm, WrappedAssignmentAddingForm} from "../AssignmentAddingForm/AssignmentAddingForm";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {toByteUnit} from "../../types/enums";
import {IAssignmentAddingFormContainerProps} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";

export interface IForumAddingFormContainerProps {
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
    // sendAssignment: (data: ISendAssignmentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void

    refreshFormTrigger: boolean
}

interface IForumAddingFormContainerState {

}


export class ForumAddingFormContainer extends React.Component<IForumAddingFormContainerProps, IForumAddingFormContainerState> {
    private form: AssignmentAddingForm | undefined;

    public constructor(props: IAssignmentAddingFormContainerProps) {
        super(props);
    }

    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        // let {title, description, ddl, fileSize, byteUnit, attachment} = values;
                        // console.log(values);
                        // description = description.replace("\n", "%0A");
                        // const sendAssignmentData: ISendAssignmentData = {
                        //     title,
                        //     description,
                        //     rid: this.props.releasement.rid,
                        //     ddl: ddl.format("YYYY-MM-DD"),
                        //     fileSize,
                        //     byteUnit: toByteUnit(byteUnit),
                        //     fileName: attachment
                        // };
                        // this.props.sendAssignment(sendAssignmentData,
                        //     this.props.onSendBefore,
                        //     this.props.onSendSuccess,
                        //     this.props.onSendFail,
                        //     this.props.onSendError
                        // )
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