import * as React from "react";
import {SlideAddingForm, WrappedSlideAddingForm} from "./SlideAddingForm";
import {IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendSlideData} from "../../api/SlideAPI";

export interface ISlideAddingFormContainerProps {
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
    sendSlide: (data: ISendSlideData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

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
                        let {title,slide} = values;
                        console.log(values);
                        const sendAssignmentData: ISendSlideData = {
                            title,
                            rid: this.props.releasement.rid,
                            fileName: slide
                        };
                        this.props.sendSlide(sendAssignmentData,
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