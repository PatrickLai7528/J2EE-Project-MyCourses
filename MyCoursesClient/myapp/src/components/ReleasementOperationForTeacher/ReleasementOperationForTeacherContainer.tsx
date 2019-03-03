import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {Card, Col, Modal, Row} from "antd";
import {EmailOperationForm} from "./EmailOperationForm";
import {IReleasement} from "../../types/entities";
import {IconText} from "../IconText/IconText";
import {WrappedUploadScoreOperationForm} from "./UploadScoreOperationForm";

export interface IReleasementOperationForTeacherContainerProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IReleasementOperationForTeacherContainerState {
    modalVisible: boolean
    confirmLoading: boolean
    submitForm: boolean
    operationType: OperationType
}

type OperationType = "BROADCAST" | "SCORE"

export class ReleasementOperationForTeacherContainer extends React.Component<IReleasementOperationForTeacherContainerProps, IReleasementOperationForTeacherContainerState> {

    public constructor(props: IReleasementOperationForTeacherContainerProps) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false,
            submitForm: false,
            operationType: "BROADCAST"
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Card title={"操作"} style={{borderRadius: 10, marginBottom: 15}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={12}>
                            <a onClick={() => this.setState({modalVisible: true, operationType: "BROADCAST"})}>
                                <IconText text={"群發郵件"}
                                          type={"mail"}/>
                            </a>
                        </Col>
                        <Col span={12}>
                            <a onClick={() => this.setState({modalVisible: true, operationType: "SCORE"})}>
                                <IconText type={"file"} text={"發佈成績"}/>
                            </a>
                        </Col>
                    </Row>
                </Card>
                <Modal align={undefined}
                       title={this.state.operationType === "SCORE" ? "發佈成績" : "群發郵件"}
                       destroyOnClose={true}
                       visible={this.state.modalVisible}
                       onOk={() => {
                           this.setState({submitForm: true})
                       }}
                       onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                       confirmLoading={this.state.confirmLoading}
                >

                    {
                        this.showForm()
                    }
                </Modal>
            </div>
        )
    }

    private getReleasement(): IReleasement {
        const {userType, forTeacher} = this.props;
        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            return forTeacher.managingReleasement
        }
        throw new Error();
    }

    private showForm(): React.ReactNode {
        switch (this.state.operationType) {
            case "BROADCAST":
                return (
                    <EmailOperationForm
                        isTimeToSubmit={this.state.submitForm}
                        releasement={this.getReleasement()}
                        onSendBefore={() => this.setState({submitForm: false, confirmLoading: true})}
                        onSendAfter={() => this.setState({
                            submitForm: false,
                            modalVisible: false,
                            confirmLoading: false
                        })}
                    />
                );
            case "SCORE":
                return (
                    <WrappedUploadScoreOperationForm
                        isTimeToSubmit={this.state.submitForm}
                        releasement={this.getReleasement()}
                        onSendBefore={() => this.setState({
                            submitForm: false,
                            confirmLoading: true
                        })}
                        onSendAfter={() => this.setState({
                            submitForm: false,
                            modalVisible: false,
                            confirmLoading: false
                        })}/>
                )
        }
    }
}