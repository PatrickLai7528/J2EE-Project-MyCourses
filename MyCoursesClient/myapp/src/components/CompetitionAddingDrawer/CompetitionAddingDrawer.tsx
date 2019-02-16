import * as React from "react";
import {Component} from "react";
import {
    Drawer, Button, Alert, message
} from 'antd';
import WrappedCompetitionAddingForm, {CompetitionAddingForm} from "../CompetitionAddingForm/CompetitionAddingForm"
import {CompetitionAPI, ICompetition} from "../../api/CompetitionAPI";
import IAPIResponse from "../../api/IAPIResponse";


export interface ICompetitionAddingDrawerProps {
    visible: boolean
    onClose: () => void
}

interface ICompetitionDrawerState {
    visible: boolean
    isWarned: boolean
}

export default class CompetitionAddingDrawer extends Component<ICompetitionAddingDrawerProps, ICompetitionDrawerState> {
    private competitionAddingForm: CompetitionAddingForm | null = null;

    public constructor(props: ICompetitionAddingDrawerProps) {
        super(props);
        console.log(props);
        this.state = {
            visible: this.props.visible,
            isWarned: false
        }
    }

    private submitCompetition(): void {
        if (this.competitionAddingForm) {
            console.log(this.competitionAddingForm.props.form);
            this.competitionAddingForm.props.form.validateFields((err, values) => {
                if (!err) {
                    if (this.state.isWarned) {
                        console.log(values);//这里可以拿到数据
                        let competition: ICompetition = {
                            name: values.competitionName,
                            startDate: values.competitionTime[0].toDate().getTime(),
                            ddl: values.competitionTime[1].toDate().getTime(),
                            description: values.competitionDescription,
                            type: JSON.parse(values.competitionType),
                            awardSum: values.awardSum,
                            foundDate: new Date().getTime(),
                            base64Images: values.competitionImages
                        };
                        CompetitionAPI.getInstance().post(competition).then((response: IAPIResponse) => {
                            if (response.isSuccess && response.message) {
                                message.success(response.message);
                                this.props.onClose();
                            } else if (!response.isSuccess && response.message) {
                                message.error(response.message);
                            }
                        }).catch(e => {
                            console.log(e);
                        });
                        console.log(competition);
                    } else {
                        this.setState({isWarned: true})
                    }
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Drawer
                    title="發佈比賽"
                    width={720}
                    placement="right"
                    onClose={() => {
                        console.log(this.state);
                        this.props.onClose();
                    }}
                    maskClosable={false}
                    visible={this.state.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <WrappedCompetitionAddingForm wrappedComponentRef={(form: CompetitionAddingForm) => {
                        this.competitionAddingForm = form;
                    }}/>
                    {
                        this.state.isWarned ? <Alert
                            message="警告"
                            description="請檢查資料是否正確!再次點擊提交"
                            type="warning"
                            showIcon
                        /> : ""
                    }
                    < div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            htmlType={"button"}
                            onClick={this.props.onClose}
                        >
                            取消
                        </Button>
                        <Button
                            htmlType={"button"} onClick={this.submitCompetition.bind(this)} type="primary">提交</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}
