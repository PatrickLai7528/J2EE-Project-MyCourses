import * as React from "react";
import {Divider, Layout} from "antd";
import {IReleasement} from "../../types/entities";
import {ReleasementManageMessage} from "./ReleasementManageMessage";
import {ReleasementManageAssignment} from "./ReleasementManageAssignment";
import {ReleasementManageSlide} from "./ReleasementManageSlide";

export interface IReleasementManageProps {
    releasement: IReleasement
    editable: boolean
    onSlideClick: () => void
    onAssignmentClick: () => void
}

const {Content, Sider} = Layout;

export const ReleasementManage: React.FunctionComponent<IReleasementManageProps> = (props: IReleasementManageProps) => {
    return (
        <Layout>
            <Content>
                <ReleasementManageMessage/>
                <Divider/>
                <ReleasementManageSlide editable={props.editable} onClick={props.onSlideClick}/>
                <Divider/>
                <ReleasementManageAssignment releasement={props.releasement} editable={props.editable}
                                             onClick={props.onAssignmentClick}/>
                <Divider/>
            </Content>
            <Sider theme={"light"} style={{margin: 15, padding: 8}} width={350}>
                <h1>討論區</h1>
            </Sider>
        </Layout>
    )
};

