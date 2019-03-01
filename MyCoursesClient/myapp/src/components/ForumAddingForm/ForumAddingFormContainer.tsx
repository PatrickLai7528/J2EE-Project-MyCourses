import * as React from "react";
import {AssignmentAddingForm} from "../AssignmentAddingForm/AssignmentAddingForm";
import {IAssignmentAddingFormContainerProps} from "../AssignmentAddingForm/AssignmentAddingFormContainer";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ForumAddingForm, WrappedForumAddingForm} from "./ForumAddingForm";
import {ISendForumData} from "../../api/ForumAPI";
import {UserType} from "../../api/UserAPI";
import {ISendForumProps, UserStateProps} from "../App/GeneralProps";

export interface IForumAddingFormContainerProps extends UserStateProps, ISendForumProps {

    isTimeToSubmit: boolean
    email:string
    releasement: IReleasement

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void

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
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let {topic} = values;
                        const sendForumData: ISendForumData = {
                            topic,
                            rid: this.props.releasement.rid,
                            questioner: this.props.email
                        };
                        this.props.sendForum(sendForumData,
                            {
                                onBefore: this.props.onSendBefore,
                                onSuccess: this.props.onSendSuccess,
                                onFail: this.props.onSendFail,
                                onError: this.props.onSendError
                            }
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
            <WrappedForumAddingForm
                wrappedComponentRef={(form: ForumAddingForm) => {
                    this.form = form;
                }}/>
        )
    }
}