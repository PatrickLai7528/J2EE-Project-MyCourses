import * as React from "react";
import {Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {ISendCourseSelectionProps, UserStateProps} from "../App/GeneralProps";
import {IReleasement} from "../../types/entities";

export interface IVisitorContentRouterProps extends ISendCourseSelectionProps, UserStateProps {
    releasementList: IReleasement[]
}


export const VisitorContentRouter: React.FunctionComponent<IVisitorContentRouterProps> = (props: IVisitorContentRouterProps) => {
    return (
        <Route exact path="/releasement/all" component={() => {
            return <ReleasementDisplayContainer
                sendCourseSelection={props.sendCourseSelection}
                releasementList={props.releasementList}
                userType={props.userType} email={props.email}/>
        }}/>
    )
}