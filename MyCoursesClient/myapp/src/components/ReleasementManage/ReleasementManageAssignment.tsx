import * as React from "react";
import {Button, Card, Collapse, Icon, Tree} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";

export interface IReleasementManageAssignmentProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}


const {TreeNode} = Tree;

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
            <Card style={{marginTop: 24}}>
                <Tree
                    showLine={true}
                    defaultExpandAll={true}
                    // expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                >
                    {
                        props.releasement.assignmentEntityList
                        && props.releasement.assignmentEntityList.map((assignment: IAssignment) => {
                            return (
                                <TreeNode title={assignment.title} key={String(assignment.assid)}>
                                    <TreeNode title={assignment.description}
                                              key={String(assignment.assid) + "d"}/>
                                </TreeNode>
                            )
                        })
                    }
                    {/*<Panel header="This is panel header 1" key="1" style={customPanelStyle}>*/}
                    {/*<p>{text}</p>*/}
                    {/*</Panel>*/}
                    {/*<Panel header="This is panel header 2" key="2" style={customPanelStyle}>*/}
                    {/*<p>{text}</p>*/}
                    {/*</Panel>*/}
                    {/*<Panel header="This is panel header 3" key="3" style={customPanelStyle}>*/}
                    {/*<p>{text}</p>*/}
                    {/*</Panel>*/}
                </Tree>
            </Card>
        </div>
    )
};
