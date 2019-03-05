import * as React from "react";
import {Modal} from "antd";
import {SubmissionDisplay} from "../SubmisstionDisplay/SubmissionDisplay";
import {IAssignment} from "../../types/entities";

export interface IAssignmentDownloadProps {
    visible: boolean
    assignment: IAssignment
    onCancel: () => void
}

interface IAssignmentDownloadState {

}

export class AssignmentDownload extends React.Component<IAssignmentDownloadProps, IAssignmentDownloadState> {
    public render(): React.ReactNode {
        return (
            <div>
                <Modal
                    mask={true}
                    onCancel={() => this.props.onCancel()}
                    onOk={() => this.props.onCancel()}
                    width={850}
                    visible={this.props.visible}
                    align={undefined}
                    destroyOnClose={true}
                    closable={true}
                    maskClosable={true}
                    title={"下載作業"}
                >
                    <SubmissionDisplay submissionList={this.props.assignment.submissionEntityList}/>
                </Modal>
            </div>
        )
    }
}