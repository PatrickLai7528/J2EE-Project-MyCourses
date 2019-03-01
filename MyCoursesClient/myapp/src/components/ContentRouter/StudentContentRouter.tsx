import * as React from "react";
import {Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {
    ISendCommentProps,
    ISendCourseReleaseProps,
    ISendCourseSelectionProps,
    UserStateProps
} from "../App/GeneralProps";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import {SelectionDisplayContainer} from "../SelectionDisplay/SelectionDisplayContainer";
import {IAppForStudentState} from "../App/App";
import {UserType} from "../../api/UserAPI";

export interface IStudentContentRouterProps {
    userType: UserType
    forStudent: IAppForStudentState
}

export const StudentContentRouter: React.FunctionComponent<IStudentContentRouterProps> = (props: IStudentContentRouterProps) => {
    return (
        <div>
            <Route exact path="/releasement/all" component={() => {
                return (
                    <ReleasementDisplayContainer
                        forStudent={props.forStudent}
                        userType={props.userType}/>
                )
            }}/>
            <Route exact path="/forum" component={
                () => {
                    if (props.forStudent.displayingSelection && props.forStudent.displayingForum && props.forStudent.email)
                        return (
                            <ForumDisplayContainer
                                userType={props.userType}
                                forStudent={props.forStudent}
                            />
                        );
                    return null;
                }
            }/>
            <Route exact path="/selection/display" component={
                () => {
                    if (props.forStudent.displayingSelection && props.forStudent.email)
                        return (
                            <SelectionDisplayContainer
                                userType={props.userType}
                                forStudent={props.forStudent}
                            />
                        );
                    return null;
                }
            }/>
        </div>
    )
}