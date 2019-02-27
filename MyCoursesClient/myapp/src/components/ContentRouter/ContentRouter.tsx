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

interface IContentRouterState {
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
}

export const ContentRouter: React.FunctionComponent<IContentRouterProps> = (props: IContentRouterProps) => {
    return (
        <Layout.Content
            style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
            {switchRouteDependOnUserType(props)}
        </Layout.Content>
    )
}
//
// export default class ContentRouter extends Component<IContentRouterProps, IContentRouterState> {
//     public constructor(props: IContentRouterProps) {
//         super(props);
//     }
//
//
//     render() {
//         return (
//             <Layout.Content
//                 style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
//                 <Switch>
//                     <Route exact path="/setting" component={Setting}/>
//                     <Route exact path="/releasement/all" component={() => {
//                         return <ReleasementDisplayContainer
//                             sendCourseSelection={this.props.sendCourseSelection}
//                             releasementList={this.props.releasementList}
//                             userType={this.props.userType} email={this.props.email}/>
//                     }}/>
//                     <Route exact path="/course/all" component={() => {
//                         return <CourseDisplayContainer
//                             userType={this.props.userType}
//                             email={this.props.email}
//                             courseList={this.props.courseList}
//                             sendAddCourse={this.props.sendAddCourse}
//                             sendCourseRelease={this.props.sendCourseRelease}
//                         />
//                     }}/>
//                     <Route exact path="/releasement/manage" component={
//                         () => {
//                             if (this.props.managingReleasement)
//                                 return <ReleasementManageContainer
//                                     setDisplayingForum={this.props.setDisplayingForum.bind(this)}
//                                     sendForum={this.props.sendForum}
//                                     sendSlide={this.props.sendSlide}
//                                     sendAssignment={this.props.sendAssignment}
//                                     userType={this.props.userType}
//                                     email={this.props.email}
//                                     releasement={this.props.managingReleasement}/>
//                             return null;
//                         }
//                     }/>
//                     <Route exact path="/forum" component={
//                         () => {
//                             console.log("in forum route");
//                             console.log(this.props);
//                             // from teacher
//                             if (this.props.managingReleasement && this.props.displayingForum && this.props.email)
//                                 return <ForumDisplayContainer
//                                     sendComment={this.props.sendComment}
//                                     forum={this.props.displayingForum}
//                                     userType={this.props.userType}
//                                     email={this.props.email}
//                                     releasement={this.props.managingReleasement}/>
//
//                             // from student
//                             if (this.props.displayingSelection && this.props.displayingForum && this.props.email)
//                                 return <ForumDisplayContainer
//                                     sendComment={this.props.sendComment}
//                                     forum={this.props.displayingForum}
//                                     userType={this.props.userType}
//                                     email={this.props.email}
//                                     releasement={this.props.displayingSelection.releasementEntity}/>
//                             return null;
//                         }
//                     }/>
//                     <Route exact path="/selection/display" component={
//                         () => {
//                             if (this.props.displayingSelection && this.props.email)
//                                 return <SelectionDisplayContainer
//                                     setDisplayingForum={this.props.setDisplayingForum.bind(this)}
//                                     userType={this.props.userType}
//                                     email={this.props.email}
//                                     selection={this.props.displayingSelection}
//                                 />;
//                             return null;
//                         }
//                     }/>
//                 </Switch>
//             </Layout.Content>
//         );
//     }
// }
//