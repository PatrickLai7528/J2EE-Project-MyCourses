import * as React from "react";
import {Component} from "react";
import './MyContent.css';
import {Layout} from 'antd';
// import CompetitionSimpleBlock from "./../CompetitionSimpleBlock/CompetitionSimpleBlock";
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import CompetitionCalendar from "./../CompetitionCalendar/CompetitionCalendar"
import CompetitionDisplay from "./../CompetitionDisplay/CompetitionDisplay"
import DefaultHome from "../DefaultHome/DefaultHome";
import Setting from "../Setting/Setting";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {UserType} from "../../api/UserAPI";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";
import {ICourse} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import {ISendReleasementData} from "../../api/CourseAPI";

export interface IMyContentProps {
    userType: UserType
    email: string | undefined
    courseList: ICourse[]
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

}


export default class MyContent extends Component<IMyContentProps, any> {
    public constructor(props: IMyContentProps) {
        super(props);
    }

    render() {
        return (
            <Layout.Content style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
                <Switch>
                    <Route exact path="/home" component={DefaultHome}/>
                    <Route exact path="/calendar" component={CompetitionCalendar}/>
                    <Route exact path="/display/:type" component={CompetitionDisplay}/>
                    <Route exact path="/setting" component={Setting}/>
                    <Route exact path="/releasement/all" component={() => {
                        return <ReleasementDisplayContainer userType={this.props.userType} email={this.props.email}/>
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
                    <Redirect to="/home"/>
                </Switch>
            </Layout.Content>
        );
    }
}

