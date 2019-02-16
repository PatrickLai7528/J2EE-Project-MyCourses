import * as React from "react";
import {ReactNode} from "react";
import {Badge, Calendar, Divider, Spin} from "antd";
import {CompetitionAPI, ICompetition, ICrawledCompetition} from "../../api/CompetitionAPI";
import {Moment} from 'moment';
import IAPIResponse from "../../api/IAPIResponse";
import CompetitionDetailBlock from "../CompetitionBlock/CompetitionDetailBlock";

interface ICompetitionCalendarState {
    competitionList: ICompetition[],
    selectedCompetitionList?: ICompetition[],
    isLoading: boolean,
    showDetail: boolean
}

export default class CompetitionCalendar extends React.Component<any, ICompetitionCalendarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            competitionList: [],
            isLoading: false,
            showDetail: false
        }
    }

    public async componentDidMount() {
        this.setState({isLoading: true});
        const responseOfPosted: IAPIResponse = await CompetitionAPI.getInstance().getPosted();
        const responseOfCrawled: IAPIResponse = await CompetitionAPI.getInstance().getCrawled();
        let competitionList: (ICompetition | ICrawledCompetition)[] = [];

        if (responseOfPosted && responseOfPosted.isSuccess) {
            responseOfPosted.resultBody.forEach((value: ICompetition) => {
                competitionList.push(value);
            })
        }

        if (responseOfCrawled && responseOfCrawled.isSuccess) {
            responseOfCrawled.resultBody.forEach((value: ICompetition) => {
                competitionList.push(value);
            })
        }
        this.setState({isLoading: false});
        this.setState({competitionList: competitionList});
    }

    private getCompetitionOn(date: Moment) {
        let ret: ICompetition[] = [];
        for (let competition of this.state.competitionList) {
            if (competition.ddl !== 0) {
                let ddl = new Date(competition.ddl);
                if (ddl.toLocaleDateString() === date.toDate().toLocaleDateString()) {
                    ret.push(competition);
                }
            }
        }
        return ret;
    }

    public dateCellRender(date: Moment): ReactNode {
        const competitionList = this.getCompetitionOn(date);
        return (
            competitionList.map((item: ICompetition) => (
                <Badge key={item.name} status="success" text={item.name}/>
            ))
        );
    }

    public handleSelect(date?: Moment): void {
        if (!date) return;
        const competitionList: ICompetition[] = this.getCompetitionOn(date);
        console.log(competitionList);
        this.setState({
            showDetail: true,
            selectedCompetitionList: competitionList
        })
    }

    render() {
        return (
            <div>
                <h1>比賽日曆</h1>
                <Divider/>
                <Spin spinning={this.state.isLoading}>
                    <Calendar dateCellRender={this.dateCellRender.bind(this)} onSelect={this.handleSelect.bind(this)}/>
                </Spin>
                {
                    this.state.showDetail && this.state.selectedCompetitionList ? (
                        <CompetitionDetailBlock
                            handleCancel={() => {
                                this.setState({
                                    showDetail: false,
                                    selectedCompetitionList: undefined
                                })
                            }

                            } visible={this.state.showDetail} competitionList={this.state.selectedCompetitionList}/>
                    ) : ""
                }
            </div>
        )
    }
}