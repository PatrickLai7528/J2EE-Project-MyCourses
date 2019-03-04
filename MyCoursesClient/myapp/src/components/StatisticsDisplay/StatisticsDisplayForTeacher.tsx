import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {ITeacherStatistics} from "../../types/entities";
import {Divider, Empty, message, Spin} from "antd";
import {StatisticsAPI} from "../../api/StatisticsAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {showStatistics} from "./ShowTeacherStatistics";

export interface IStatisticsDisplayForTeacherProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IStatisticsDisplayForTeacherState {
    teacherStatistics?: ITeacherStatistics
}

export class StatisticsDisplayForTeacher extends React.Component<IStatisticsDisplayForTeacherProps, IStatisticsDisplayForTeacherState> {

    public constructor(props: IStatisticsDisplayForTeacherProps) {
        super(props);
        this.state = {teacherStatistics: undefined}
    }

    public componentWillMount(): void {
        StatisticsAPI.getInstance().getTeacherStatistics(this.getEmail())
            .then((response: IAPIResponse<ITeacherStatistics>) => {
                if (response.isSuccess && response.payload)
                    this.setState({teacherStatistics: response.payload})
            })
            .catch((e: any) => {
                console.log(e);
                message.error("發生未知錯誤，請稍候再試")
            })
    }


    public render(): React.ReactNode {
        console.log(this.state.teacherStatistics);
        if (!this.state.teacherStatistics) {
            return (
                <Spin spinning={true}>
                    {showStatistics(this.state.teacherStatistics)}
                </Spin>
            );
        } else if (!this.state.teacherStatistics.outlineStatistics || !this.state.teacherStatistics.releasementStatisticsList || !this.state.teacherStatistics.semesterStatisticsList) {
            return (<div>
                    <h1>統計信息</h1>
                    <Divider/>
                    <Empty/>
                </div>
            )
        } else
            return (
                showStatistics(this.state.teacherStatistics)
            )
    }


    private getEmail(): string {
        if (this.props.userType && this.props.forTeacher)
            return this.props.forTeacher.email;
        throw new Error();
    }
}