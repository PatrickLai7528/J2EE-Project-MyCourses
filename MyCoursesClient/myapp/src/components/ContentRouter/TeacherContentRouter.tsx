import * as React from "react";
import {Route} from "react-router";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {
    ISendAddCourseProps,
    ISendAssignmentProps,
    ISendCommentProps, ISendCourseReleaseProps,
    ISendForumProps,
    ISendSlideProps,
    UserStateProps
} from "../App/GeneralProps";
import {ICourse, IForum, IReleasement} from "../../types/entities";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";

export interface ITeacherContentRouterProps
    extends UserStateProps, ISendAssignmentProps,
        ISendSlideProps, ISendForumProps, ISendCommentProps,
        ISendCourseReleaseProps, ISendAddCourseProps {
    managingReleasement?: IReleasement
    displayingForum?: IForum
    setDisplayingForum: (forum: IForum) => void
    courseList: ICourse[]
}


export const TeacherContentRouter: React.FunctionComponent<ITeacherContentRouterProps> = (props: ITeacherContentRouterProps) => {
    return (
        <div>
            <Route exact path="/releasement/manage" component={
                () => {
                    if (props.managingReleasement)
                        return <ReleasementManageContainer
                            setDisplayingForum={props.setDisplayingForum}
                            sendForum={props.sendForum}
                            sendSlide={props.sendSlide}
                            sendAssignment={props.sendAssignment}
                            userType={props.userType}
                            email={props.email}
                            releasement={props.managingReleasement}/>
                    return null;
                }
            }/>
            <Route exact path="/forum" component={
                () => {
                    if (props.managingReleasement && props.displayingForum)
                        return <ForumDisplayContainer
                            sendComment={props.sendComment}
                            forum={props.displayingForum}
                            userType={props.userType}
                            email={props.email}
                            releasement={props.managingReleasement}/>
                    return null;
                }
            }/>
            <Route exact path="/course/all" component={() => {
                return <CourseDisplayContainer
                    userType={props.userType}
                    email={props.email}
                    courseList={props.courseList}
                    sendAddCourse={props.sendAddCourse}
                    sendCourseRelease={props.sendCourseRelease}
                />
            }}/>
        </div>
    )
}