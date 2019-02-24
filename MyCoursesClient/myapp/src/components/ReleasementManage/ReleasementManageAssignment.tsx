import * as React from "react";
import {Button, Icon, List} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";
import {months} from "moment";

const moment = require("moment");

export interface IReleasementManageAssignmentProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}

interface IIconTextProps {
    type: string,
    text: string | React.ReactNode
}

const IconText: React.FunctionComponent<IIconTextProps> = (props: IIconTextProps) => (
    <span>
    <Icon type={props.type} style={{marginRight: 8}}/>
        {props.text}
  </span>
);

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
                    renderItem={(assignment: IAssignment) => {
                        return (
                            <List.Item
                                actions={[
                                    <IconText type="check" text={"提交人數：" + assignment.submissionEntityList.length}/>,
                                    <IconText type="calendar"
                                              text={"截止日期：" + moment(assignment.ddl).format("YYYY-MM-DD")}/>,
                                    <a><IconText type={"file"} text={"附件"}/></a>
                                ]}
                            >
                                <List.Item.Meta
                                    title={assignment.title}
                                    description={"大小限制：" + assignment.fileSize.size + " " + assignment.fileSize.unit}

                                />
                                {assignment.description}
                            </List.Item>
                        )
                    }}
                />
            </
                div>
            {/*{*/}
            {/*props.releasement.assignmentEntityList*/
            }
            {/*&& props.releasement.assignmentEntityList.map((assignment: IAssignment) => {*/
            }
            {/*return (*/
            }
            {/*<List.Item>*/
            }
            {/*<span>描述：{assignment.description}</span>*/
            }
            {/*<span>作業大小：{assignment.fileSize.size + " " + assignment.fileSize.unit}</span>*/
            }
            {/*</List.Item>*/
            }
            {/*)*/
            }
            {/*})*/
            }
            {/*}*/
            }
            {/*<Panel header="This is panel header 1" key="1" style={customPanelStyle}>*/
            }
            {/*<p>{text}</p>*/
            }
            {/*</Panel>*/
            }
            {/*<Panel header="This is panel header 2" key="2" style={customPanelStyle}>*/
            }
            {/*<p>{text}</p>*/
            }
            {/*</Panel>*/
            }
            {/*<Panel header="This is panel header 3" key="3" style={customPanelStyle}>*/
            }
            {/*<p>{text}</p>*/
            }
            {/*</Panel>*/
            }
        </div>
    )
};
