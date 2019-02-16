import * as React from "react";
import {Divider, Form, Select} from "antd";
import {FormComponentProps} from "antd/lib/form";
import UserAPI, {IUserSimpleInfo} from "../../api/UserAPI";
import {NameFormItem, StudentNoFormItem} from "../SignUpForm/SignUpFormItem";
import IAPIResponse from "../../api/IAPIResponse";

interface IUserProfileFromState {
    userInfo: IUserSimpleInfo | undefined;
    areaCodeSelector: React.ReactNode | undefined;
    jobTypeOptions: string[] | undefined;
}

class UserProfileFrom extends React.Component<FormComponentProps, IUserProfileFromState> {
    public constructor(props: FormComponentProps) {
        super(props);
        this.state = {
            userInfo: undefined,
            areaCodeSelector: undefined,
            jobTypeOptions: undefined
        }
    }

    public async componentDidMount() {
        const messageOfUserInfo: IAPIResponse = await UserAPI.getInstance().getSimpleUserInfo();
        if (messageOfUserInfo.isSuccess)
            this.setState({userInfo: messageOfUserInfo.resultBody});

        const messageOfAreaCode: IAPIResponse = await UserAPI.getInstance().getAreaCode();
        if (messageOfAreaCode.isSuccess) {
            const areaCodes = messageOfAreaCode.resultBody;
            const {userInfo} = this.state;
            this.setState({
                areaCodeSelector: (
                    <Select defaultValue={userInfo ? userInfo.areaCode : areaCodes[0]} style={{width: 80}}>
                        {
                            areaCodes.map((areCode: string) => {
                                return <Select.Option key={areCode} value={areCode}>{areCode}</Select.Option>
                            })
                        }
                    </Select>
                )
            })
        }

        const messageOfJobType: IAPIResponse = await UserAPI.getInstance().getJobTypeOptions();
        if (messageOfJobType.isSuccess) {
            const jobTypeOptions = messageOfJobType.resultBody; // be care of this
            this.setState({jobTypeOptions: jobTypeOptions});
        }
        console.log(this.state);
    }

    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        const {userInfo, jobTypeOptions, areaCodeSelector} = this.state;
        return (
            <Form hideRequiredMark={true}>
                <NameFormItem
                    getFieldDecorator={getFieldDecorator}
                    placeholder={userInfo ? userInfo.nickname : ""}
                />
                <StudentNoFormItem
                    areaCodeSelector={areaCodeSelector ? areaCodeSelector : ""}
                    getFieldDecorator={getFieldDecorator}
                    placeholder={userInfo ? userInfo.phoneNumber : ""}
                />
                {/*<JobTypeFormItem*/}
                {/*jobTypeOptions={jobTypeOptions ? jobTypeOptions : []}*/}
                {/*getFieldDecorator={getFieldDecorator}*/}
                {/*placeholder={userInfo ? userInfo.jobType : ""}*/}
                {/*/>*/}
            </Form>
        )
    }
}

const WrappedForm = Form.create()(UserProfileFrom);

export default class Setting extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                <h1>設定</h1>
                <Divider/>
                <WrappedForm/>
            </div>
        )
    }
}