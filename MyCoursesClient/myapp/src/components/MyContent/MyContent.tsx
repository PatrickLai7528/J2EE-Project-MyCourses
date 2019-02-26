import * as React from "react";
import {Component} from "react";
import './MyContent.css';
import {Layout} from 'antd';
// import CompetitionSimpleBlock from "./../CompetitionSimpleBlock/CompetitionSimpleBlock";
import {Route, Switch} from 'react-router-dom'
import Setting from "../Setting/Setting";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {UserType} from "../../api/UserAPI";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";
import {ICourse, IForum, IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendReleasementData} from "../../api/CourseAPI";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {ISendSlideData} from "../../api/SlideAPI";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";

export interface IMyContentProps {
    userType: UserType
    email: string | undefined
    courseList: ICourse[]
    releasementList: IReleasement[]

    /**
     * for teacher, while teacher sider click a releasement,
     * this releasement will be passed from App.tsx
     */
    managingReleasement?: IReleasement

    displayingForum?: IForum
    setDisplayingForum: (forum: IForum) => void
    /**
     *
     * @param courseName
     * @param email
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAddCourse: (
        courseName: string,
        email: string,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void

    sendCourseRelease: (
        data: ISendReleasementData,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void

    /**
     *
     * @param email
     * @param rid
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendCourseSelection: (email: string, rid: number,
                          onBefore?: () => void,
                          onSuccess?: (response: IAPIResponse<any>) => void,
                          onFail?: (response: IAPIResponse<any>) => void,
                          onError?: (e: any) => void) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData,
                     onBefore?: () => void,
                     onSuccess?: (response: IAPIResponse<any>) => void,
                     onFail?: (response: IAPIResponse<any>) => void,
                     onError?: (e: any) => void) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendSlide: (data: ISendSlideData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    /**
     * send assignment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendForum: (data: ISendForumData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

    /**
     * send Comment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendComment: (data: ISendCommentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

}

interface IMyContentState {
}

export default class MyContent extends Component<IMyContentProps, IMyContentState> {
    public constructor(props: IMyContentProps) {
        super(props);
    }


    render() {
        return (
            <Layout.Content
                style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
                <Switch>
                    <Route exact path="/setting" component={Setting}/>
                    <Route exact path="/releasement/all" component={() => {
                        return <ReleasementDisplayContainer
                            sendCourseSelection={this.props.sendCourseSelection}
                            releasementList={this.props.releasementList}
                            userType={this.props.userType} email={this.props.email}/>
                    }}/>
                    <Route exact path="/course/all" component={() => {
                        return <CourseDisplayContainer
                            userType={this.props.userType}
                            email={this.props.email}
                            courseList={this.props.courseList}
                            sendAddCourse={this.props.sendAddCourse}
                            sendCourseRelease={this.props.sendCourseRelease}
                        />
                    }}/>
                    <Route exact path="/releasement/manage" component={
                        () => {
                            if (this.props.managingReleasement)
                                return <ReleasementManageContainer
                                    setDisplayingForum={this.props.setDisplayingForum.bind(this)}
                                    sendForum={this.props.sendForum}
                                    sendSlide={this.props.sendSlide}
                                    sendAssignment={this.props.sendAssignment}
                                    userType={this.props.userType}
                                    email={this.props.email}
                                    releasement={this.props.managingReleasement}/>
                            return null;
                        }
                    }/>
                    <Route exact path="/forum" component={
                        () => {
                            console.log("in forum route");
                            console.log(this.props);
                            if (this.props.managingReleasement && this.props.displayingForum && this.props.email)
                                return <ForumDisplayContainer
                                    sendComment={this.props.sendComment}
                                    forum={this.props.displayingForum}
                                    userType={this.props.userType}
                                    email={this.props.email}
                                    releasement={this.props.managingReleasement}/>
                            return null;
                        }
                    }/>
                </Switch>
            </Layout.Content>
        );
    }
}

