import * as React from "react";
import {Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {ISendCommentProps, ISendCourseSelectionProps, UserStateProps} from "../App/GeneralProps";
import {IForum, IReleasement, ISelection} from "../../types/entities";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import {SelectionDisplayContainer} from "../SelectionDisplay/SelectionDisplayContainer";

export interface IStudentContentRouterProps extends UserStateProps, ISendCourseSelectionProps, ISendCommentProps {
    releasementList: IReleasement[]
    displayingSelection?: ISelection
    displayingForum?: IForum

    setDisplayingForum: (forum: IForum) => void
}

export const StudentContentRouter: React.FunctionComponent<IStudentContentRouterProps> = (props: IStudentContentRouterProps) => {
    return (
        <div>
            <Route exact path="/releasement/all" component={() => {
                return <ReleasementDisplayContainer
                    sendCourseSelection={props.sendCourseSelection}
                    releasementList={props.releasementList}
                    userType={props.userType} email={props.email}/>
            }}/>
            <Route exact path="/forum" component={
                () => {
                    if (props.displayingSelection && props.displayingForum && props.email)
                        return <ForumDisplayContainer
                            sendComment={props.sendComment}
                            forum={props.displayingForum}
                            userType={props.userType}
                            email={props.email}
                            releasement={props.displayingSelection.releasementEntity}/>
                    return null;
                }
            }/>
            <Route exact path="/selection/display" component={
                () => {
                    if (props.displayingSelection && props.email)
                        return <SelectionDisplayContainer
                            setDisplayingForum={props.setDisplayingForum}
                            userType={props.userType}
                            email={props.email}
                            selection={props.displayingSelection}
                        />;
                    return null;
                }
            }/>
        </div>
    )
}