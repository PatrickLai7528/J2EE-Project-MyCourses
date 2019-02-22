import * as React from "react";
import {ICompetition} from "../../api/CompetitionAPI";
import {Button, Modal} from "antd";
import MarkdownGenerator from "../../utils/MarkdownGenerator";

const ReactMarkdown = require('react-markdown');

export interface ICompetitionDetailBlockProps {
    visible: boolean
    handleCancel: () => void
    competitionList: ICompetition[]
}

interface ICompetitionDetailBlockState {
    visible: boolean;
    currentCompetition: ICompetition | undefined
    activeIndex: number
}

export default class CompetitionDetailBlock extends React.Component<ICompetitionDetailBlockProps, ICompetitionDetailBlockState> {

    public constructor(props: ICompetitionDetailBlockProps) {
        super(props);
        this.state = {
            visible: this.props.visible,
            currentCompetition: props.competitionList[0],
            activeIndex: 0
        };
    }

    private toNextCompetition(): void {
        let {activeIndex} = this.state;

        activeIndex++;
        this.setState({
            activeIndex: activeIndex,
            currentCompetition: this.props.competitionList[activeIndex]
        })
    }


    public render(): React.ReactNode {
        return (
            <Modal
                visible={this.state.visible}
                destroyOnClose={true}
                maskClosable={true}
                closable={true}
                centered={true}
                footer={
                    this.state.activeIndex < this.props.competitionList.length - 1?
                        <Button htmlType={"button"} onClick={this.toNextCompetition.bind(this)}>下一個</Button>
                        : null
                }
                keyboard={true}
                onCancel={this.props.handleCancel}
                width={"80%"}
            >
                {
                    this.state.currentCompetition ?
                        <ReactMarkdown escapeHtml={false}
                                       source={MarkdownGenerator.generateFromCompetition(this.state.currentCompetition)}
                        />
                        : ""
                }

            </Modal>
        )
    }

}