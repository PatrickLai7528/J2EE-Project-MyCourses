import * as React from "react";
import {Route} from "react-router";
import ReleasementDisplayContainer from "../ReleasementDisplay/ReleasementDisplayContainer";
import {ForumDisplayContainer} from "../ForumDisplay/ForumDisplayContainer";
import {SelectionDisplayContainer} from "../SelectionDisplay/SelectionDisplayContainer";
import {AppContextConsumer} from "../App/App";
import {IAppContext} from "../../store/AppContext";


export const StudentContentRouter: React.FunctionComponent = () => {
    return (
        <AppContextConsumer>
            {
                (props: IAppContext) => {
                    console.log("in student router");
                    console.log(props);
                    if (props.forStudent) {
                        const {releasementList, email, displayingForum, displayingSelection, setDisplayingForum} = props.forStudent
                        return (
                            <div>
                                <Route exact path="/releasement/all" component={() => {
                                    return <ReleasementDisplayContainer
                                        sendCourseSelection={props.sendCourseSelection}
                                        releasementList={releasementList}
                                        userType={props.userType} email={email}/>
                                }}/>
                                {
                                    displayingForum && displayingSelection ? <Route exact path="/forum" component={
                                        () => {
                                            return <ForumDisplayContainer
                                                sendComment={props.sendComment}
                                                forum={displayingForum}
                                                userType={props.userType}
                                                email={email}
                                                releasement={displayingSelection.releasementEntity}/>
                                        }
                                    }/> : ""
                                }
                                {
                                    displayingSelection ? <Route exact path="/selection/display" component={
                                        () => {
                                            return <SelectionDisplayContainer
                                                setDisplayingForum={setDisplayingForum}
                                                userType={props.userType}
                                                email={email}
                                                selection={displayingSelection}
                                            />;
                                        }
                                    }/> : ""
                                }

                            </div>
                        )
                    }
                }
            }
        </AppContextConsumer>
    )
};
