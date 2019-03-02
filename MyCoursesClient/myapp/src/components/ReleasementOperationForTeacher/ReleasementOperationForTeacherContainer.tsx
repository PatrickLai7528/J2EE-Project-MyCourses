import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForTeacherState} from "../App/App";
import {ReleasementOperationForTeacher} from "./ReleasementOperationForTeacher";
import {Card, Col, Modal, Row} from "antd";
import {EmailOperationForm} from "./EmailOperationForm";
import {IReleasement} from "../../types/entities";
import {IconText} from "../IconText/IconText";
import {ForumAddingFormContainer} from "../ForumAddingForm/ForumAddingFormContainer";

export interface IReleasementOperationForTeacherContainerProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}

interface IReleasementOperationForTeacherContainerState {
    modalVisible: boolean
    confirmLoading: boolean
    submitForm: boolean
}

export class ReleasementOperationForTeacherContainer extends React.Component<IReleasementOperationForTeacherContainerProps, IReleasementOperationForTeacherContainerState> {

    public constructor(props: IReleasementOperationForTeacherContainerProps) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false,
            submitForm: false
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Card title={"操作"} style={{borderRadius: 10, marginBottom: 15}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={12}>
                            <a onClick={() => this.setState({modalVisible: true})}>
                                <IconText text={"群發郵件"}
                                          type={"mail"}/>
                            </a>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </Card>
                <Modal align={undefined}
                       title={"群發郵件"}
                       destroyOnClose={true}
                       visible={this.state.modalVisible}
                       onOk={() => {
                           this.setState({submitForm: true})
                       }}
                       onCancel={() => this.setState({confirmLoading: false, submitForm: false, modalVisible: false})}
                       confirmLoading={this.state.confirmLoading}
                >
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
}