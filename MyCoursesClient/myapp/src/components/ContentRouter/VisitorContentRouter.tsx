import * as React from "react";
import {Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {AppContextConsumer} from "../App/App";
import {IAppContext} from "../../store/AppContext";

export const VisitorContentRouter: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                (props: IAppContext) => {
                    if (props.forVisitor) {
                        const {releasementList} = props.forVisitor;
                        return (
                            <Route exact path="/releasement/all" component={() => {
                                return <ReleasementDisplayContainer
                                    sendCourseSelection={props.sendCourseSelection}
                                    releasementList={releasementList}
                                    userType={props.userType} email={undefined}/>
                            }}/>
                        )
                    }
                }
            }

        </AppContextConsumer>
    )
}