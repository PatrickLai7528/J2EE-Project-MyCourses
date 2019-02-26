import * as React from "react"
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";
import {DatePicker, Form, InputNumber, Radio, TimePicker} from "antd";

export interface IGeneralReleaseCourseFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export const EffectiveTimeReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item
            label="開課時間"
        >
            {props.getFieldDecorator('effectiveTime', {
                rules: [
                    {
                        required: true, message: '開課時間不能為空',
                    }
                ],
            })(
                <DatePicker placeholder="開課時間"/>
            )}
        </Form.Item>
    )
};

export const DeadTimeReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item
            label="結課時間"
        >
            {props.getFieldDecorator('deadTime', {
                rules: [
                    {
                        required: true, message: '結課時間不能為空',
                    }
                ],
            })(
                <DatePicker placeholder="結課時間"/>
            )}
        </Form.Item>
    )
};

export const StartTimeReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item
            label="上課時間"
        >
            {props.getFieldDecorator('startTime', {
                rules: [
                    {
                        required: true, message: '上課時間不能為空',
                    }
                ],
            })(
                <TimePicker format={"HH:mm"} placeholder="上課時間" minuteStep={5}/>
            )}
        </Form.Item>
    )
};

export const EndTimeReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item
            label="下課時間"
        >
            {props.getFieldDecorator('endTime', {
                rules: [
                    {
                        required: true, message: '下課時間不能為空',
                    }
                ],
            })(
                <TimePicker format={"HH:mm"} placeholder="下課時間" minuteStep={5}/>
            )}
        </Form.Item>
    )
};

export const RepeatReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item label="重覆">
            {props.getFieldDecorator("repeat", {
                rules: [
                    {
                        required: true, message: '下課時間不能為空',
                    }
                ],
            })(
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="7">單週</Radio.Button>
                    <Radio.Button value="14">雙週</Radio.Button>
                </Radio.Group>
            )}
        </Form.Item>
    )
};

export const LimitNumberReleaseCourseFormItem: React.FunctionComponent<IGeneralReleaseCourseFormItemProps> = (props: IGeneralReleaseCourseFormItemProps) => {
    return (
        <Form.Item label="限選人數">
            {props.getFieldDecorator("limitNumber", {
                rules: [
                    {
                        required: true, message: '限選人數不能為空',
                    }
                ],
            })(
                <InputNumber min={0} max={200} placeholder="限選人數"/>
            )}
        </Form.Item>
    )
};