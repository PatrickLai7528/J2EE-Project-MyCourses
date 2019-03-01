import * as React from "react";
import {Empty, Icon, List} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";
import NetworkSettings from "../../setting/NetworkSettings";

const moment = require("moment");

export interface IAssignmentDisplayProps {
    // userType: UserType
    // forStudent?: IAppForStudentState
    // forTeacher?: IAppForTeacherState
    addAssignmentButton?: React.ReactNode
    assignmentList: IAssignment[]
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

export const AssignmentSimpleDisplay: React.FunctionComponent<IAssignmentDisplayProps> = (props: IAssignmentDisplayProps) => {


    return (
        <div>
            <h1>
                作業
            </h1>
            {
                props.addAssignmentButton
            }
            <div>
                {
                    props.assignmentList.length === 0 ?
                        <Empty/>
                        :
                        <List
                            dataSource={props.assignmentList}
                            bordered={true}
                            itemLayout="vertical"
                            size="large"
                            renderItem={(assignment: IAssignment) => {
                                return (
                                    <List.Item
                                        actions={[
                                            <IconText type="check"
                                                      text={"提交人數：" + (assignment.submissionEntityList? assignment.submissionEntityList.length : 0)}/>,
                                            <IconText type="calendar"
                                                      text={"截止日期：" + moment(assignment.ddl).format("YYYY-MM-DD")}/>,
                                            <div>
                                                {/* slideEntity is a optional value of assignment */}
                                                {assignment.slideEntity ?
                                                    <a href={NetworkSettings.getOpenNetworkIP() + "/file/attachment/download?fileName=" + assignment.slideEntity.filePath + "&rename=附件-" + assignment.title}><IconText
                                                        type={"file"} text={"附件"}/></a>
                                                    : ""
                                                }
                                            </div>,
                                            <IconText type={"upload"} text={(<a>提交作業</a>)}/>
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
                }
            </div>
        </div>
    )
}