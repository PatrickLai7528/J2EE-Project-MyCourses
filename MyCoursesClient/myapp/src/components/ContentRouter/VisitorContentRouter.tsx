import * as React from "react";
import {Redirect, Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {IAppForVisitorState} from "../App/App";
import {UserType} from "../../api/UserAPI";

export interface IVisitorContentRouterProps {
    userType: UserType
    forVisitor: IAppForVisitorState
}


export const VisitorContentRouter: React.FunctionComponent<IVisitorContentRouterProps> = (props: IVisitorContentRouterProps) => {
    return (
        <div>
            <Redirect to={"/releasement/all"}/>
            <Route exact path="/releasement/all" component={() => {
                return (
                    <ReleasementDisplayContainer
                        userType={props.userType}
                        forVisitor={props.forVisitor}
                    />
                )
            }}/>
        </div>
    )
}