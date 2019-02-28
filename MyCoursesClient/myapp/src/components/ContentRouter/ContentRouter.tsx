import * as React from "react";
import './ContentRouter.css';
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import {ICourse, IForum, IReleasement, ISelection} from "../../types/entities";
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
import {VisitorContentRouter} from "./VisitorContentRouter";
import {TeacherContentRouter} from "./TeacherContentRouter";
import {StudentContentRouter} from "./StudentContentRouter";
import {AppContext} from "../App/App";

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
