import * as React from "react";
import './ContentRouter.css';
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import {AppContextConsumer} from "../App/App";
import {VisitorContentRouter} from "./VisitorContentRouter";
import {TeacherContentRouter} from "./TeacherContentRouter";
import {StudentContentRouter} from "./StudentContentRouter";
import {UserType} from "../../api/UserAPI";
//
// export interface IContentRouterProps
//     extends UserStateProps, ISendAssignmentProps,
//         ISendSlideProps, ISendForumProps, ISendAddCourseProps,
//         ISendCourseReleaseProps, ISendCourseSelectionProps, ISendCommentProps {
//     courseList: ICourse[]
//     releasementList: IReleasement[]
//
//     /**
//      * for teacher, while teacher sider click a releasement,
//      * this releasement will be passed from App.tsx
//      */
//     managingReleasement?: IReleasement
//
//     displayingForum?: IForum
//     displayingSelection?: ISelection
//
//     setDisplayingForum: (forum: IForum) => void
//
// }

const switchRouteDependOnUserType = (userType: UserType): React.ReactNode => {
    switch (userType) {
        case "visitor":
            return <Switch><VisitorContentRouter/></Switch>;
        case "teacher":
            return <Switch><TeacherContentRouter/></Switch>;
        case "student":
            return <Switch><StudentContentRouter/></Switch>;
    }
};

export const ContentRouter: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                //解體一下props:IAppContext
                ({userType}) =>
                    (
                        <Layout.Content
                            style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
                            {switchRouteDependOnUserType(userType)}
                        </Layout.Content>
                    )
            }
        </AppContextConsumer>
    )
};
