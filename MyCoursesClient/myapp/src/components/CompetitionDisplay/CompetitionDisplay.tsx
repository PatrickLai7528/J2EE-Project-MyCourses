import * as React from "react";
import {CompetitionAPI, ICompetition, ICrawledCompetition} from "../../api/CompetitionAPI";
import CompetitionSimpleBlock from "../CompetitionBlock/CompetitionSimpleBlock";
import {Divider, Spin} from "antd";
import IAPIResponse from "../../api/IAPIResponse";

export interface ICompetitionDisplayProps {
    match?: any
}

interface ICompetitionDisplayState {
    competitionList: ICompetition[]
    isLoading: boolean;
}

export default class CompetitionDisplay extends React.Component<ICompetitionDisplayProps, ICompetitionDisplayState> {

    constructor(props: any) {
        super(props);
        this.state = {
            competitionList: [],
            isLoading: false
        }
    }

    public async componentDidMount() {
        this.setState({isLoading: true});
        const responseOfPosted: IAPIResponse<any> = await CompetitionAPI.getInstance().getPosted();
        const responseOfCrawled: IAPIResponse<any> = await CompetitionAPI.getInstance().getCrawled();
        let competitionList: (ICompetition | ICrawledCompetition) [] = [];

        if (responseOfPosted && responseOfPosted.isSuccess) {
            responseOfPosted.payload.forEach((value: ICompetition) => {
                competitionList.push(value);
            })
        }

        if (responseOfCrawled && responseOfCrawled.isSuccess) {
            responseOfCrawled.payload.forEach((value: ICompetition) => {
                competitionList.push(value);
            })
        }

        this.setState({isLoading: false, competitionList: competitionList});
        console.log(this.state);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h1>比賽列表</h1>
                <Divider/>
                <Spin spinning={this.state.isLoading}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        alignContent: "stretch"
                    }}>
                        {
                            this.state.competitionList.map((competition: ICompetition, index: number) => {
                                if (competition.imagePath) {
                                    return index > 50
                                    || competition.imagePath.length < 1
                                    || (this.props.match.params.type !== "all" && competition.type != this.props.match.params.type) ? "" : (
                                        <div key={competition.name} style={{
                                            padding: "15px",
                                            alignSelf: "flex-start"
                                        }}>
                                            <CompetitionSimpleBlock competition={competition}
                                                                    imagePath={competition.imagePath[0]}/>
                                        </div>)
                                } else {
                                    return "";
                                }
                            })
                        }
                    </div>
                </Spin>
            </div>
        )
    }
}