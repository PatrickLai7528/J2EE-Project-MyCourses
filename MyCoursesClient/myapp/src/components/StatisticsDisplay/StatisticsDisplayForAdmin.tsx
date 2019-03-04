import * as React from "react";
import {Col, Divider, Row, Spin, Statistic} from "antd";
import {IAdminStatistics} from "../../types/entities";
import {StatisticsAPI} from "../../api/StatisticsAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {showStatistics} from "./ShowTeacherStatistics";
import {showAdminStatistics} from "./ShowAdminStatistics";

export interface IStatisticsDisplayForAdminProps {

}

interface IStatisticsDisplayForAdminState {
    adminStatistics?: IAdminStatistics;
    loading: boolean
}

export class StatisticsDisplayForAdmin extends React.Component<IStatisticsDisplayForAdminProps, IStatisticsDisplayForAdminState> {
    public constructor(props: IStatisticsDisplayForAdminProps) {
        super(props);
        this.state = {loading: false}
    }

    public componentWillMount(): void {
        this.setState({loading: true});
        StatisticsAPI.getInstance().getAdminStatistics()
            .then((response: IAPIResponse<IAdminStatistics>) => {
                if (response.isSuccess && response.payload)
                    this.setState({adminStatistics: response.payload})
            })
            .catch((e: any) => {
                console.log(e)
            })
            .finally(() => {
                this.setState({loading: false})
            })
    }

    public render(): React.ReactNode {
        if (!this.state.adminStatistics)
            return (
                <Spin spinning={this.state.loading}>
                    {showAdminStatistics(this.state.adminStatistics)}
                </Spin>
            );
        else
            return (
                <div>{showAdminStatistics(this.state.adminStatistics)}</div>
            )
    }
}
