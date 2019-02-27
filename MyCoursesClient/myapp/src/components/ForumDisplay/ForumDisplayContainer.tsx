import * as React from "react";
import {ForumDisplay} from "./ForumDisplay";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement} from "../../types/entities";
import {Divider} from "antd";
import {ISendCommentData} from "../../api/ForumAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {UserStateProps} from "../App/GeneralProps";

export interface IForumDisplayContainerProps extends UserStateProps{
    releasement: IReleasement
    forum: IForum
    /**
     * send Comment callback from App.tsx
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendComment: (data: ISendCommentData, onBefore?: () => void, onSuccess?: (response: IAPIResponse<any>) => void, onFail?: (response: IAPIResponse<any>) => void, onError?: (e: any) => void) => void

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