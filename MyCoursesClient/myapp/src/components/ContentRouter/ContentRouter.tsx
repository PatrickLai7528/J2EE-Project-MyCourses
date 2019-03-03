import * as React from "react";
import './ContentRouter.css';
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import {VisitorContentRouter} from "./VisitorContentRouter";
import {TeacherContentRouter} from "./TeacherContentRouter";
import {StudentContentRouter} from "./StudentContentRouter";
import {UserType} from "../../api/UserAPI";
import {IAppForAdminState, IAppForStudentState, IAppForTeacherState, IAppForVisitorState} from "../App/App";
import {AdminContentRouter} from "./AdminContentRouter";

export interface IContentRouterProps {
    userType: UserType
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    forVisitor?: IAppForVisitorState
    forAdmin?: IAppForAdminState
}

const switchRouteDependOnUserType = (props: IContentRouterProps): React.ReactNode => {
    switch (props.userType) {
        case "visitor":
            return props.forVisitor &&
               <Switch><VisitorContentRouter userType={props.userType} forVisitor={props.forVisitor}/></Switch>;
        case "teacher":
            return props.forTeacher &&
               <Switch><TeacherContentRouter userType={props.userType} forTeacher={props.forTeacher}/></Switch>;
        case "student":
            return props.forStudent &&
               <Switch><StudentContentRouter userType={props.userType} forStudent={props.forStudent}/></Switch>;
        case "admin":
            return props.forAdmin &&
               <Switch><AdminContentRouter userType={props.userType} forAdmin={props.forAdmin}/></Switch>
    }
};

export const ContentRouter: React.FunctionComponent<IContentRouterProps> = (props: IContentRouterProps) => {
    return (
        <Layout.Content
            style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
            {switchRouteDependOnUserType(props)}
        </Layout.Content>
    )
};
