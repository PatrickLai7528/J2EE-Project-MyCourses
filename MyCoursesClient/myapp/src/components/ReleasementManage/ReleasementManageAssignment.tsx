import * as React from "react";
import {Button, Card, Collapse, Icon} from "antd";
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
            <Collapse
                style={{marginTop: 24}}
                // showLine={true}
                // defaultExpandAll={true}
                expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
            >
                {
                    props.releasement.assignmentEntityList
                    && props.releasement.assignmentEntityList.map((assignment: IAssignment) => {
                        return (
                            <Panel key={String(assignment.assid)} header={assignment.title}>
                                <p>
                                    {assignment.description}
                                </p>
                            </Panel>
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
            </Collapse>
        </div>
    )
};
