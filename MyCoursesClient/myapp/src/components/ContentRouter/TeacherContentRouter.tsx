import * as React from "react";
import {Route} from "react-router";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";
import {IAppForTeacherState} from "../App/App";
import {UserType} from "../../api/UserAPI";

export interface ITeacherContentRouterProps {
    userType: UserType
    forTeacher: IAppForTeacherState
}


export const TeacherContentRouter: React.FunctionComponent<ITeacherContentRouterProps> = (props: ITeacherContentRouterProps) => {
    return (
        <div>
            <Route exact path="/releasement/manage" component={
                () => {
                    if (props.forTeacher.managingReleasement)
                        return (
                            <ReleasementManageContainer
                                forTeacher={props.forTeacher}
                                userType={props.userType}
                                // setDisplayingForum={props.forTeacher.setDisplayingForum}
                                // sendForum={props.forTeacher.sendForum}
                                // sendSlide={props.forTeacher.sendSlide}
                                // sendAssignment={props.forTeacher.sendAssignment}
                                // userType={props.userType}
                                // releasement={props.forTeacher.managingReleasement}
                            />
                        )
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