import * as React from "react";
import './ContentRouter.css';
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import {VisitorContentRouter} from "./VisitorContentRouter";
import {TeacherContentRouter} from "./TeacherContentRouter";
import {StudentContentRouter} from "./StudentContentRouter";
import {UserType} from "../../api/UserAPI";
import {IAppForStudentState, IAppForTeacherState, IAppForVisitorState} from "../App/App";

export interface IContentRouterProps {
    userType: UserType
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    forVisitor?: IAppForVisitorState
    // courseList: ICourse[]
    // releasementList: IReleasement[]
    //
    // /**
    //  * for teacher, while teacher sider click a releasement,
    //  * this releasement will be passed from App.tsx
    //  */
    // managingReleasement?: IReleasement
    //
    // displayingForum?: IForum
    // displayingSelection?: ISelection
    //
    // setDisplayingForum: (forum: IForum) => void

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
