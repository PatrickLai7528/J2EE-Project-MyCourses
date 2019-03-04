import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForAdminState} from "../App/App";
import {Redirect, Route} from "react-router";
import {CourseApproval} from "../AdminApproval/CourseApproval";
import {ReleasementApproval} from "../AdminApproval/ReleasementApproval";
import {StatisticsDisplayForAdmin} from "../StatisticsDisplay/StatisticsDisplayForAdmin";

export interface IAdminContentRouterProps {
    userType: UserType
    forAdmin: IAppForAdminState

}

export const AdminContentRouter: React.FunctionComponent<IAdminContentRouterProps> = (props: IAdminContentRouterProps) => {
    return (
        <div>
            <Redirect to={"/approval/course"}/>
            <Route exact path="/approval/course" component={() => {
                return (
                    <CourseApproval userType={props.userType} forAdmin={props.forAdmin}/>
                )
            }}/>
            <Route exact path="/approval/releasement" component={() => {
                return (
                    <ReleasementApproval userType={props.userType} forAdmin={props.forAdmin}/>
                )
            }}/>
            <Route exact path="/statistics/admin" component={() => {
                return (
                    <div><StatisticsDisplayForAdmin/></div>
                )
            }}/>
        </div>
    )
}