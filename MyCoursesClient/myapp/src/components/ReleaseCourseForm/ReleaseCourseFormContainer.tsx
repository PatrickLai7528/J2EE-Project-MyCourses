import * as React from "react";
import WrappedReleaseForm, {ReleaseCourseForm} from "./ReleaseCourseForm";
import {ISendReleasementData} from "../../api/CourseAPI";
import {ICourse} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";

export interface IReleaseCourseFormContainerProps {
    isTimeToSubmit: boolean
    course: ICourse
    onReleaseBefore?: () => void
    onReleaseSuccess?: (response: IAPIResponse<any>) => void
    onReleaseFail?: (response: IAPIResponse<any>) => void
    onReleaseError?: (e: any) => void

    sendCourseRelease: (
        data: ISendReleasementData,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void

}

interface IReleaseCourseFormContainerState {
    refresh: boolean
}

export default class ReleaseCourseFormContainer extends React.Component<IReleaseCourseFormContainerProps, IReleaseCourseFormContainerState> {
    private form: ReleaseCourseForm | undefined;

    public constructor(props: IReleaseCourseFormContainerProps) {
        super(props);
        this.state = {refresh: false}
    }


    private submit(): void {
        if (this.form) {
            console.log(this.form.props.form);
            this.form.props.form.validateFields((err: any, values: any) => {
                    if (!err) {
                        const {effectiveTime, deadTime, startTime, endTime, repeat, limitNumber} = values;
                        const sendReleaseData: ISendReleasementData = {
                            cid: this.props.course.cid,
                            effectiveTime: effectiveTime.format("YYYY-MM-DD"),
                            deadTime: deadTime.format("YYYY-MM-DD"),
                            startHour: startTime.format("HH"),
                            startMin: startTime.format("mm"),
                            endHour: endTime.format("HH"),
                            endMin: endTime.format("mm"),
                            repeat: repeat,
                            limitNumber: limitNumber
                        };
                        this.props.sendCourseRelease(sendReleaseData,
                            this.props.onReleaseBefore,
                            this.props.onReleaseSuccess,
                            this.props.onReleaseFail,
                            this.props.onReleaseError
                        )
                        // console.log(sendReleaseData);
                        // if (this.props.onReleaseBefore)
                        //     this.props.onReleaseBefore();
                        // CourseAPI.getInstance().sendReleasement(sendReleaseData)
                        //     .then((response: IAPIResponse<any>) => {
                        //         if (response.isSuccess) {
                        //             if (this.props.onReleaseSuccess)
                        //                 this.props.onReleaseSuccess(response);
                        //         } else {
                        //             if (this.props.onReleaseFail)
                        //                 this.props.onReleaseFail(response);
                        //         }
                        //     })
                        //     .catch((e: any) => {
                        //         if (this.props.onReleaseError)
                        //             this.props.onReleaseError(e);
                        //     })
                    }
                }
            );
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IReleaseCourseFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit) {
            this.submit()
        }
        this.setState({refresh: !this.state.refresh})
    }

    public render(): React.ReactNode {
        return (
            <WrappedReleaseForm refresh={this.state.refresh} wrappedComponentRef={(form: ReleaseCourseForm) => {
                this.form = form;
            }}/>
        )
    }
}