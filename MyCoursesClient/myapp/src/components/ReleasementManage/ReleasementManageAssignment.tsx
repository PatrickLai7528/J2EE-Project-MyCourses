import * as React from "react";
import {Button, Collapse, Icon} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";

export interface IReleasementManageAssignmentProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}

const {Panel} = Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginTop: 24,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
            >
                {
                    props.releasement.assignmentEntityList
                    && props.releasement.assignmentEntityList.map((assignment: IAssignment) => {
                        return <Panel header={assignment.title} key={String(assignment.assid)} style={customPanelStyle}>
                            {assignment.description}
                        </Panel>
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
