import * as React from "react";
import {Empty, Icon, List} from "antd";
import {IAssignment, IReleasement} from "../../types/entities";
import NetworkSettings from "../../setting/NetworkSettings";
import {IconText} from "../IconText/IconText";

const moment = require("moment");

export interface IAssignmentDisplayProps {
    // userType: UserType
    // forStudent?: IAppForStudentState
    // forTeacher?: IAppForTeacherState
    addAssignmentButton?: React.ReactNode
    submitAssignmentButtonList?: React.ReactNode[]
    downloadAssignmentButton?: (assignment: IAssignment) => React.ReactNode
    assignmentList: IAssignment[]
}


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
                                        actions={
                                            [
                                                <IconText type="calendar"
                                                          text={"截止日期：" + moment(assignment.ddl).format("YYYY-MM-DD")}/>,
                                                props.downloadAssignmentButton && props.downloadAssignmentButton(assignment),
                                                <div>
                                                    {/* slideEntity is a optional value of assignment */}
                                                    {assignment.slideEntity ?
                                                        <a href={NetworkSettings.getOpenNetworkIP() + "/file/attachment/download?fileName=" + assignment.slideEntity.filePath}><IconText
                                                            type={"file"} text={"附件"}/></a>
                                                        : ""
                                                    }
                                                </div>,
                                                props.submitAssignmentButtonList && props.submitAssignmentButtonList[assignment.assid]
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