import * as React from "react";
import {Form, Col, Row, Input, Select, DatePicker} from "antd";
import {CompetitionTypeAPI, ICompetitionType} from "../../api/CompetitionTypeAPI";
import {FormComponentProps} from 'antd/lib/form';
import MyUpload from "../MyUpload/MyUpload";
import IAPIResponse from "../../api/IAPIResponse";

interface ICompetitionTypeOptionProps {
    setValue: (value: string) => void
}

interface ICompetitionTypeOptionState {
    types: ICompetitionType[]
}

const selectBefore = (
    <Select defaultValue="MOP" style={{width: 90}}>
        <Select.Option value="MOP">MOP</Select.Option>
        <Select.Option value="HKD">HKD</Select.Option>
        <Select.Option value="CNY">CNY</Select.Option>
    </Select>
);

class CompetitionTypeOption extends React.Component<ICompetitionTypeOptionProps, ICompetitionTypeOptionState> {
    constructor(props: ICompetitionTypeOptionProps) {
        super(props);
        this.state = {
            types: []
        }

    }

    public async componentDidMount() {
        const response: IAPIResponse<any> = await CompetitionTypeAPI.getInstance().get();
        if (response && response.isSuccess) {
            this.setState({types: response.payload})
        }
    }

    render() {
        return (
            <Select onChange={this.props.setValue} placeholder="Competition Type">
                {
                    this.state.types.map((type: ICompetitionType) => {
                        return (
                            <Select.Option key={type.english}
                                           value={JSON.stringify(type)}
                            >
                                {type.chinese}
                            </Select.Option>
                        )
                    })
                }
            </Select>
        )
    }
}


export class CompetitionAddingForm extends React.Component<FormComponentProps, any> {
    constructor(props: FormComponentProps) {
        super(props);
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="課程名稱">
                                {
                                    getFieldDecorator('competitionName',
                                        {
                                            rules: [{required: true, message: 'Please input competition name'}],
                                        })
                                    (<Input placeholder="Competition Name"/>)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="獎金總量">
                                {
                                    getFieldDecorator('awardSum',
                                        {
                                            rules: [{required: true, message: 'Please input award sum'}],
                                        })
                                    (<Input placeholder="Award Sum" addonBefore={selectBefore}/>)
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="比賽類型">
                                {
                                    getFieldDecorator("competitionType", {
                                        rules: [{required: true, message: 'Please input competition type'}],
                                    })
                                    (
                                        <CompetitionTypeOption setValue={(value: string) => {
                                            this.props.form.setFieldsValue({"competitionType": value})
                                        }}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="比賽時間">
                                {
                                    getFieldDecorator("competitionTime", {
                                        rules: [{required: true, message: 'Please input start date and end date'}],
                                    })
                                    (
                                        <DatePicker.RangePicker
                                            style={{width: '100%'}}
                                            showTime={{format: 'HH:mm'}}
                                            format="YYYY-MM-DD HH:mm"
                                            placeholder={["開始時間", "結束時間"]}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="比賽描述">
                                {
                                    getFieldDecorator("competitionDescription", {
                                        rules: [{required: true, message: 'Please input description'}],
                                    })
                                    (
                                        <Input.TextArea rows={4} placeholder="Description"/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="上傳海報、章程、報名表">
                                {
                                    getFieldDecorator("competitionImages", {
                                        rules: [{required: true, message: 'Please upload image'}],
                                    })
                                    (
                                        <MyUpload setValue={(fileList: string[]) => {
                                            this.props.form.setFieldsValue({"competitionImages": fileList})
                                        }}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

const WrappedCompetitionAddingForm = Form.create()(CompetitionAddingForm);
export default WrappedCompetitionAddingForm;
