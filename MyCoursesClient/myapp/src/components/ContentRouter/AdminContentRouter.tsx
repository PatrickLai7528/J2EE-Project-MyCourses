import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IAppForAdminState} from "../App/App";
import {Route} from "react-router";
import {CourseApproval} from "../AdminApproval/CourseApproval";
import {ReleasementApproval} from "../AdminApproval/ReleasementApproval";

export interface IAdminContentRouterProps {
    userType: UserType
    forAdmin: IAppForAdminState

}

export const AdminContentRouter: React.FunctionComponent<IAdminContentRouterProps> = (props: IAdminContentRouterProps) => {
    return (
        <div>
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
        </div>
    )
}