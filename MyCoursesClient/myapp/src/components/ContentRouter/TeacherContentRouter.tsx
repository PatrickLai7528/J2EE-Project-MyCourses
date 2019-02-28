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
import {AppContextConsumer} from "../App/App";
import {IAppContext} from "../../store/AppContext";


export const TeacherContentRouter: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                (props: IAppContext) => {
                    console.log("in teacher router");
                    console.log(props);
                    if (props.forTeacher) {
                        const {email, setDisplayingForum, courseList, displayingForum, managingReleasement, releasementList} = props.forTeacher;
                        return (
                            <div>
                                <Route exact path="/releasement/manage" component={
                                    () => {
                                        return managingReleasement ? <ReleasementManageContainer
                                            setDisplayingForum={setDisplayingForum}
                                            sendForum={props.sendForum}
                                            sendSlide={props.sendSlide}
                                            sendAssignment={props.sendAssignment}
                                            userType={props.userType}
                                            email={email}
                                            releasement={managingReleasement}/> : null;
                                    }
                                }/>
                                <Route exact path="/forum" component={
                                    () => {
                                        return displayingForum && managingReleasement ? <ForumDisplayContainer
                                            sendComment={props.sendComment}
                                            forum={displayingForum}
                                            userType={props.userType}
                                            email={email}
                                            releasement={managingReleasement}/> : null
                                    }
                                }/>
                                <Route exact path="/course/all" component={() => {
                                    return <CourseDisplayContainer
                                        userType={props.userType}
                                        email={email}
                                        courseList={courseList}
                                        sendAddCourse={props.sendAddCourse}
                                        sendCourseRelease={props.sendCourseRelease}
                                    />
                                }}/>
                            </div>
                        )
                    }
                }
            }

        </AppContextConsumer>
    )
}