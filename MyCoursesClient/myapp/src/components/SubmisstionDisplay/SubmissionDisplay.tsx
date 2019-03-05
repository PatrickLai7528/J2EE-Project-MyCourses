import * as React from "react";
import {ISubmission} from "../../types/entities";
import {Table} from "antd";
import {SubmissionDisplayTableColumns} from "./SubmissionDisplayTableColumns";

export interface ISubmissionDisplayProps {
    submissionList: ISubmission[]
}

interface ISubmissionDisplayState {

}

export class SubmissionDisplay extends React.Component<ISubmissionDisplayProps, ISubmissionDisplayState> {
    public render(): React.ReactNode {
        return (
            <Table dataSource={this.props.submissionList}
                   columns={SubmissionDisplayTableColumns.getColumns()}/>
        )
    }
}