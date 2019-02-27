import * as React from "react";
import {ForumDisplay} from "./ForumDisplay";
import {IForum, IReleasement} from "../../types/entities";
import {Divider} from "antd";
import {ISendCommentProps, UserStateProps} from "../App/GeneralProps";

export interface IForumDisplayContainerProps extends UserStateProps, ISendCommentProps {
    releasement: IReleasement
    forum: IForum
}

interface IForumDisplayContainerState {

}

export class ForumDisplayContainer extends React.Component<IForumDisplayContainerProps, IForumDisplayContainerState> {
    public constructor(props: IForumDisplayContainerProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>{"討論區"}</h1>
                <Divider/>
                <ForumDisplay forum={this.props.forum}
                              releasement={this.props.releasement}
                              sendComment={this.props.sendComment}
                              userType={this.props.userType}
                              email={this.props.email}
                />
            </div>
        )
    }
}