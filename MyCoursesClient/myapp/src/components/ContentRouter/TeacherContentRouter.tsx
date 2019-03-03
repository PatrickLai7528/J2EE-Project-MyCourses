import * as React from "react";
import {Redirect, Route} from "react-router";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";
import {IAppForTeacherState} from "../App/App";
import {UserType} from "../../api/UserAPI";
import {StatisticsDisplay} from "../StatisticsDisplay/StatisticsDisplay";

export interface ITeacherContentRouterProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}


export const TeacherContentRouter: React.FunctionComponent<ITeacherContentRouterProps> = (props: ITeacherContentRouterProps) => {
    return (
        <div>
            <Redirect to="/course/all"/>
            <Route exact path="/statistics" component={
                () => {
                    return (<div><StatisticsDisplay userType={props.userType} forTeacher={props.forTeacher}/></div>)
                }
            }
            />
            <Route exact path="/releasement/manage" component={
                () => {
                    if (props.forTeacher.managingReleasement)
                        return (
                            <ReleasementManageContainer
                                forTeacher={props.forTeacher}
                                userType={props.userType}
                            />
                        );
                    return null;
                }
            }/>
            <Route exact path="/forum" component={
                () => {
                    if (props.forTeacher.managingReleasement && props.forTeacher.displayingForum)
                        return (
                            <ForumDisplayContainer
                                userType={props.userType}
                                forTeacher={props.forTeacher}
                            />
                        );
                    return null;
                }
            }/>
            <Route exact path="/course/all" component={() => {
                return (
                    <CourseDisplayContainer
                        userType={props.userType}
                        forTeacher={props.forTeacher}
                        // email={props.forTeacher.email}
                        // courseList={props.forTeacher.courseList}
                        // sendAddCourse={props.forTeacher.sendAddCourse}
                        // sendCourseRelease={props.forTeacher.sendCourseRelease}
                    />
                )
            }}/>
        </div>
    )
}