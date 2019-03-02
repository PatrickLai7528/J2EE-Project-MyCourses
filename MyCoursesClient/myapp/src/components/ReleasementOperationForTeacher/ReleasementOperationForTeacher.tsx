import * as React from "react";
import {Card, Col, Row} from "antd";
import {IconText} from "../IconText/IconText";

export interface IReleasementOperationForTeacherProps {

}

export const ReleasementOperationForTeacher: React.FunctionComponent<IReleasementOperationForTeacherProps> = (props: IReleasementOperationForTeacherProps) => {
    return (
        <Card title={"操作"} style={{borderRadius: 10, marginBottom: 15}}>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={12}><a><IconText text={"群發郵件"} type={"mail"}/></a></Col>
                <Col span={12}></Col>
            </Row>
        </Card>
    )
};