import * as React from "react";
import {AssignmentAddingForm} from "../AssignmentAddingForm/AssignmentAddingForm";
import {IAssignmentAddingFormContainerProps} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ForumAddingForm, WrappedForumAddingForm} from "./ForumAddingForm";
import {ISendForumData} from "../../api/ForumAPI";
import {UserType} from "../../api/UserAPI";

export interface IForumAddingFormContainerProps {
    userType: UserType,
    email: string

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
    sendForum: (data: ISendForumData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void

    refreshFormTrigger: boolean
}

interface IForumAddingFormContainerState {

}


export class ForumAddingFormContainer extends React.Component<IForumAddingFormContainerProps, IForumAddingFormContainerState> {
    private form: ForumAddingForm | undefined;

    public constructor(props: IForumAddingFormContainerProps) {
        super(props);
    }

    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let {topic} = values;
                        const sendForumData: ISendForumData = {
                            topic,
                            rid: this.props.releasement.rid,
                            questioner: this.props.email
                        };
                        this.props.sendForum(sendForumData,
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

    public componentWillReceiveProps(nextProps: Readonly<IForumAddingFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit)
            this.submit();
    }

    public render(): React.ReactNode {
        return (
            <WrappedForumAddingForm resetTrigger={this.props.refreshFormTrigger}
                                    wrappedComponentRef={(form: ForumAddingForm) => {
                                        this.form = form;
                                    }}/>
        )
    }
}