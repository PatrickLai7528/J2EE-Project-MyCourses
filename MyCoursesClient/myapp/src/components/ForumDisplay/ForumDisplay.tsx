import * as React from "react";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {Button, Card, Comment, Form} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {ISendCommentData, ISendForumData} from "../../api/ForumAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {ForumComment} from "./ForumComment";
import {UserType} from "../../api/UserAPI";

export interface IForumDisplayProps {
    forum: IForum
    userType: UserType
    email: string
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

export const ForumDisplay: React.FunctionComponent<IForumDisplayProps> = (props: IForumDisplayProps) => {
    console.log("in forum display")
    console.log(props);
    return (
        <Card title={props.forum.topic}>
            {
                props.forum.commentEntityList.map((comment: IComment) => {
                    return (
                        <div key={comment.cmid} style={{marginBottom: 5}}>
                            <ForumComment
                                comment={comment}
                                userType={props.userType}
                                email={props.email}
                                forum={props.forum}
                                releasement={props.releasement}
                                sendComment={props.sendComment}
                            >
                                {
                                    showBelowComment(comment.belowCommentList, props)
                                }
                                {/*<Editor/>*/}
                            </ForumComment>
                        </div>
                    )
                })
            }
        </Card>
    )
};