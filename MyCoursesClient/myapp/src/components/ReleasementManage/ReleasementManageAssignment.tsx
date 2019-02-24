import * as React from "react";
import {Button, Card, Collapse, Icon, List} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";

export interface IReleasementManageAssignmentProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}

const Panel = Collapse.Panel;


export const ReleasementManageAssignment: React.FunctionComponent<IReleasementManageAssignmentProps> = (props: IReleasementManageAssignmentProps) => {
    return (
        <div>
            <h1>
                作業
            </h1>
            {
                props.editable ? (
                    <Button htmlType={"button"} type={"primary"} onClick={props.onClick}>發佈作業</Button>) : ""
            }
            <div style={{marginTop: 24}}>
                <List
                    dataSource={props.releasement.assignmentEntityList}
                    bordered={true}
                    itemLayout="vertical"
                    size="large"
                    // style={{marginTop: 24}}
                    // showLine={true}
                    // defaultExpandAll={true}
                    // expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                    renderItem={(assignment: IAssignment) => {
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    title={assignment.title}
                                    description={"描述：" + assignment.description}
                                />
                                {
                                    "作業限制：" + assignment.fileSize.size + " " + assignment.fileSize.unit
                                }
                            </List.Item>
                        )
                    }}
                />
            </div>
            {/*{*/}
            {/*props.releasement.assignmentEntityList*/}
            {/*&& props.releasement.assignmentEntityList.map((assignment: IAssignment) => {*/}
            {/*return (*/}
            {/*<List.Item>*/}
            {/*<span>描述：{assignment.description}</span>*/}
            {/*<span>作業大小：{assignment.fileSize.size + " " + assignment.fileSize.unit}</span>*/}
            {/*</List.Item>*/}
            {/*)*/}
            {/*})*/}
            {/*}*/}
            {/*<Panel header="This is panel header 1" key="1" style={customPanelStyle}>*/}
            {/*<p>{text}</p>*/}
            {/*</Panel>*/}
            {/*<Panel header="This is panel header 2" key="2" style={customPanelStyle}>*/}
            {/*<p>{text}</p>*/}
            {/*</Panel>*/}
            {/*<Panel header="This is panel header 3" key="3" style={customPanelStyle}>*/}
            {/*<p>{text}</p>*/}
            {/*</Panel>*/}
        </div>
    )
};
