import * as React from "react";
import {Divider, Layout} from "antd";
import {IReleasement} from "../../types/entities";
import {ReleasementManageMessage} from "./ReleasementManageMessage";
import {ReleasementManageAssignment} from "./ReleasementManageAssignment";
import {ReleasementManageSlide} from "./ReleasementManageSlide";
import {ReleasementManageForum} from "./ReleasementManageForum";

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
                <h1>{props.releasement.courseEntity.name}</h1>
                <Divider/>
                <ReleasementManageMessage/>
                <Divider/>
                <ReleasementManageSlide editable={props.editable} onClick={props.onSlideClick}
                                        releasement={props.releasement}/>
                <Divider/>
                <ReleasementManageAssignment releasement={props.releasement} editable={props.editable}
                                             onClick={props.onAssignmentClick}/>
                <Divider/>
            </Content>
            <Sider theme={"light"} style={{marginTop: 0, margin: 15, padding: 8, background: "#f0f2f5"}} width={250}>
                <ReleasementManageForum releasement={props.releasement}/>
            </Sider>
        </Layout>
    )
};

