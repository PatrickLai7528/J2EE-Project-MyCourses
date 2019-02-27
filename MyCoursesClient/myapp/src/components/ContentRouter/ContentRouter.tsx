import * as React from "react";
import './ContentRouter.css';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom'
import Setting from "../Setting/Setting";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import CourseDisplayContainer from "../CourseDisplay/CourseDisplayContainer";
import {ICourse, IForum, IReleasement, ISelection} from "../../types/entities";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import {SelectionDisplayContainer} from "../SelectionDisplay/SelectionDisplayContainer";
import {
    ISendAddCourseProps,
    ISendAssignmentProps,
    ISendCommentProps,
    ISendCourseReleaseProps,
    ISendCourseSelectionProps,
    ISendForumProps,
    ISendSlideProps,
    UserStateProps
} from "../App/GeneralProps";
import {UserType} from "../../api/UserAPI";
import {VisitorContentRouter} from "./VisitorContentRouter";
import {TeacherContentRouter} from "./TeacherContentRouter";
import {StudentContentRouter} from "./StudentContentRouter";

export interface IContentRouterProps
    extends UserStateProps, ISendAssignmentProps,
        ISendSlideProps, ISendForumProps, ISendAddCourseProps,
        ISendCourseReleaseProps, ISendCourseSelectionProps, ISendCommentProps {
    courseList: ICourse[]
    releasementList: IReleasement[]

    /**
     * for teacher, while teacher sider click a releasement,
     * this releasement will be passed from App.tsx
     */
    managingReleasement?: IReleasement

    displayingForum?: IForum
    displayingSelection?: ISelection

    setDisplayingForum: (forum: IForum) => void

}

const switchRouteDependOnUserType = (props: IContentRouterProps): React.ReactNode => {
    switch (props.userType) {
        case "visitor":
            return <Switch><VisitorContentRouter {...props}/></Switch>;
        case "teacher":
            return <Switch><TeacherContentRouter {...props}/></Switch>;
        case "student":
            return <Switch><StudentContentRouter {...props}/></Switch>;
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
