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
import {ICourse, IReleasement} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendReleasementData} from "../../api/CourseAPI";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {ISendSlideData} from "../../api/SlideAPI";

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

}


export default class MyContent extends Component<IMyContentProps, any> {
    public constructor(props: IMyContentProps) {
        super(props);
    }

    render() {
        return (
            <Layout.Content
                style={{ marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
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
                            return <ReleasementManageContainer
                                sendSlide={this.props.sendSlide}
                                sendAssignment={this.props.sendAssignment}
                                userType={this.props.userType}
                                email={this.props.email}
                                releasement={this.props.managingReleasement}/>
                        }
                    }/>
                </Switch>
            </Layout.Content>
        );
    }
}

