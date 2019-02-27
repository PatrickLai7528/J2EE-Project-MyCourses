import * as React from "react";
import {SlideAddingForm, WrappedSlideAddingForm} from "./SlideAddingForm";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendSlideProps} from "../App/GeneralProps";

export interface ISlideAddingFormContainerProps extends ISendSlideProps {
    isTimeToSubmit: boolean

    releasement: IReleasement

    onSendBefore: () => void
    onSendSuccess: (response: IAPIResponse<any>) => void
    onSendFail: (response: IAPIResponse<any>) => void
    onSendError: (e: any) => void

    refreshFormTrigger: boolean
}

interface ISlideAddingFormContainerState {

}

export class SlideAddingFormContainer extends React.Component<ISlideAddingFormContainerProps, ISlideAddingFormContainerState> {
    private form: SlideAddingForm | undefined;

    public constructor(props: ISlideAddingFormContainerProps) {
        super(props);
    }


    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        let {title, slide} = values;
                        console.log(values);
                        const sendAssignmentData: ISendSlideData = {
                            title,
                            rid: this.props.releasement.rid,
                            fileName: slide
                        };
                        this.props.sendSlide(sendAssignmentData, {
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

    public componentWillReceiveProps(nextProps: Readonly<ISlideAddingFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit)
            this.submit();
    }

    public render(): React.ReactNode {
        return (
            <WrappedSlideAddingForm resetTrigger={this.props.refreshFormTrigger}
                                    wrappedComponentRef={(form: SlideAddingForm) => {
                                        this.form = form;
                                    }}/>
        )
    }
}