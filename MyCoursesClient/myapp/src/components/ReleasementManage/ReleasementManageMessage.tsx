import * as React from "react";
import {IReleasement} from "../../types/entities";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {Alert} from "antd";

const moment = require("moment");

export interface IReleasementManageMessageProps {
    userType: UserType
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
}

export const ReleasementManageMessage: React.FunctionComponent<IReleasementManageMessageProps> = (props: IReleasementManageMessageProps) => {
    function getMessage() {
        const {userType, forStudent, forTeacher} = props;
        if (userType === "student" && forStudent && forStudent.displayingSelection) {
            return (
                <div>
                    <Alert style={{marginBottom: 10}}
                           message="課程時間"
                           description={moment(forStudent.displayingSelection.releasementEntity.effectiveTime).format("YYYY-MM-DD") + " - " + moment(forStudent.displayingSelection.releasementEntity.deadTime).format("YYYY-MM-DD")}
                           type={"warning"}
                    />
                    {forStudent.displayingSelection.score && <Alert
                       message="成績發佈"
                       description={"學生" + forStudent.displayingSelection.studentEntity.name + ", 課程" + forStudent.displayingSelection.releasementEntity.courseEntity.name + ", 成績為" + forStudent.displayingSelection.score}
                       type="success"
                    />}
                </div>
            )
        }

        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            return (
                <div>
                    <Alert style={{marginBottom: 10}}
                           message="課程開始日期"
                           description={moment(forTeacher.managingReleasement.effectiveTime).format("YYYY-MM-DD")}
                           type={"success"}
                    />
                    <Alert style={{marginBottom: 10}}
                           message="課程結束日期"
                           description={moment(forTeacher.managingReleasement.deadTime).format("YYYY-MM-DD")}
                           type={"success"}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            <h1>
                通知
            </h1>
            {
                getMessage()
            }
        </div>
    )
};