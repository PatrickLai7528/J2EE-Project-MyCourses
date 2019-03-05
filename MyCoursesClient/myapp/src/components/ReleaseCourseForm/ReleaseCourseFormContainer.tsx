import * as React from "react";
import WrappedReleaseForm, {ReleaseCourseForm} from "./ReleaseCourseForm";
import {ISendReleasementData} from "../../api/CourseAPI";
import {ICourse} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendCourseReleaseProps} from "../App/SendActionProps";

export interface IReleaseCourseFormContainerProps extends ISendCourseReleaseProps {
    isTimeToSubmit: boolean
    course: ICourse
    onReleaseBefore?: () => void
    onReleaseSuccess?: (response: IAPIResponse<any>) => void
    onReleaseFail?: (response: IAPIResponse<any>) => void
    onReleaseError?: (e: any) => void
}

interface IReleaseCourseFormContainerState {
}

export default class ReleaseCourseFormContainer extends React.Component<IReleaseCourseFormContainerProps, IReleaseCourseFormContainerState> {
    private form: ReleaseCourseForm | undefined;

    public constructor(props: IReleaseCourseFormContainerProps) {
        super(props);
        this.state = {refresh: false}
    }


    private submit(): void {
        if (this.form) {
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
                            {
                                onBefore: this.props.onReleaseBefore,
                                onSuccess: this.props.onReleaseSuccess,
                                onFail: this.props.onReleaseFail,
                                onError: this.props.onReleaseError
                            }
                        )
                    }
                }
            );
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IReleaseCourseFormContainerProps>, nextContext: any): void {
        if (nextProps.isTimeToSubmit) {
            this.submit()
        }
    }

    public render(): React.ReactNode {
        return (
            <WrappedReleaseForm wrappedComponentRef={(form: ReleaseCourseForm) => {
                this.form = form;
            }}/>
        )
    }
}