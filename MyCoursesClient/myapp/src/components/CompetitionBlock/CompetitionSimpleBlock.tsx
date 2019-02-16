import * as React from "react";
import {Component} from "react";
import './CompetitionBlock.css';
import {
    Button,
    Card, Icon
} from 'antd';
import ImageUtils from "../../utils/ImageUtils";
import {ICompetition} from "../../api/CompetitionAPI";
import CompetitionDetailBlock from "./CompetitionDetailBlock";
import DateUtils from "../../utils/DateUtils";

// const {Meta} = Card;

export interface ICompetitionProps {
    competition: ICompetition
    // name: string,
    // ddl: string,
    imagePath: string
    style?: object
}

interface ICompetitionState {
    competition: ICompetition
    // name: string,
    // ddl: string,
    imagePath: string
    showDetail: boolean
}

export default class CompetitionSimpleBlock extends Component<ICompetitionProps, ICompetitionState> {
    constructor(props: ICompetitionProps) {
        super(props);
        this.state = {
            competition: this.props.competition,
            // name: props.name,
            // ddl: props.ddl,
            imagePath: props.imagePath,
            showDetail: false
        }
    }

    public handleClick() {
        this.setState({showDetail: true})
    }

    render() {
        let {style} = this.props;
        if (!style)
            style = {};
        return (
            <Card
                className="competition-card"
                style={style}
                cover={<img alt=""
                            src={ImageUtils.getOkToSendPath(this.state.imagePath)}/>}
                actions={
                    [
                        <Icon type="like"/>,
                        <Icon type="dislike"/>,
                        <Button size={"small"} htmlType={"button"} onClick={this.handleClick.bind(this)}>查看詳情</Button>
                    ]
                }>
                <Card.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title={this.state.competition.name}
                    description={DateUtils.toShowableString(this.state.competition.ddl)}
                />
                {
                    this.state.showDetail ? (
                        <CompetitionDetailBlock
                            handleCancel={() => {
                                this.setState({showDetail: false})
                            }}
                            competitionList={[this.props.competition]}
                            visible={this.state.showDetail}/>
                    ) : ""
                }
            </Card>
        );
    }
}

