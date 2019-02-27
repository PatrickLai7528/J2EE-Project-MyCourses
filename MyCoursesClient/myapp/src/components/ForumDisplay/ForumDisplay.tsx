import * as React from "react";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {Card, Empty} from "antd";
import {ISendCommentData} from "../../api/ForumAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ForumComment} from "./ForumComment";
import {UserType} from "../../api/UserAPI";
import {ForumCommentEditor} from "./ForumCommentEditor";
import {UserStateProps} from "../App/GeneralProps";

export interface IForumDisplayProps extends UserStateProps {
    forum: IForum
    releasement: IReleasement
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

const showBelowComment = (commentList: IComment[] | undefined, props: IForumDisplayProps): React.ReactNode => {
    if (!commentList || commentList.length === 0) return null;
    return (
        commentList.map((comment: IComment) => {
            return (
                <div key={comment.cmid} style={{marginBottom: 5}}>
                    <ForumComment comment={comment}
                                  userType={props.userType}
                                  email={props.email}
                                  forum={props.forum}
                                  releasement={props.releasement}
                                  sendComment={props.sendComment}
                    >
                        {showBelowComment(comment.belowCommentList, props)}
                        {/*<Editor/>*/}
                    </ForumComment>
                </div>
            )
        })
    )
};

interface IForumDisplayState {
    enableEditor: boolean
}

export class ForumDisplay extends React.Component<IForumDisplayProps, IForumDisplayState> {

    public constructor(props: IForumDisplayProps) {
        super(props);
        this.state = {enableEditor: false}
    }


    public render(): React.ReactNode {
        return (
            <Card title={this.props.forum.topic} extra={<a onClick={() => this.setState({enableEditor: true})}>留言</a>}>
                {
                    this.props.forum.commentEntityList.map((comment: IComment) => {
                        return (
                            <div key={comment.cmid} style={{marginBottom: 5}}>
                                <ForumComment
                                    comment={comment}
                                    userType={this.props.userType}
                                    email={this.props.email}
                                    forum={this.props.forum}
                                    releasement={this.props.releasement}
                                    sendComment={this.props.sendComment}
                                >
                                    {
                                        showBelowComment(comment.belowCommentList, this.props)
                                    }
                                    {/*<Editor/>*/}
                                </ForumComment>
                            </div>
                        )
                    })
                }
                {
                    this.state.enableEditor ? <ForumCommentEditor
                        userType={this.props.userType}
                        email={this.props.email}
                        forum={this.props.forum}
                        comment={"BaseComment"}
                        releasement={this.props.releasement}
                        sendComment={this.props.sendComment}
                    /> : ""
                }
            </Card>
        )
    }
};