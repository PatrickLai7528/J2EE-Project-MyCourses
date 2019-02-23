import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {Divider, Layout} from "antd";
import {IReleasement} from "../../types/entities";

export interface IReleasementManageProps {
    userType: UserType
    email: string
    releasement: IReleasement
}

const {Content, Sider} = Layout;

export const ReleasementManage: React.FunctionComponent<IReleasementManageProps> = (props: IReleasementManageProps) => {
    return (
        <Layout>
            <Content>
                <Divider/>
                <h1>
                    通知
                </h1>
                <Divider/>
                <h1>
                    課件
                </h1>
                <Divider/>
                <h1>
                    作業
                </h1>
                <Divider/>
            </Content>
            <Sider theme={"light"} style={{margin: 15, padding: 8}}>
                <h1>討論區</h1>
            </Sider>
        </Layout>
    )
};

