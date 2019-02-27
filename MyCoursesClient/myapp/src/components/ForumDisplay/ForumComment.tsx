import * as React from "react";
import {Comment} from "antd";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {ForumCommentEditor} from "./ForumCommentEditor";
import {ISendCommentProps, UserStateProps} from "../App/GeneralProps";

const moment = require("moment");

export interface IForumCommentProps extends UserStateProps, ISendCommentProps {
    comment: IComment
    children?: React.ReactNode[]

    forum: IForum
    releasement: IReleasement
}

interface IForumCommentState {
    enabledEditor: boolean
    showBelowComment: boolean
}


export class ForumComment extends React.Component<IForumCommentProps, IForumCommentState> {

    public constructor(props: IForumCommentProps) {
        super(props);
        this.state = {enabledEditor: false, showBelowComment: true}
    }

    private getMessageFromEmail(comment: IComment): string {
        return comment.messageFromTeacher ? comment.messageFromTeacher.teacherEmail :
            comment.messageFromStudent ? comment.messageFromStudent.studentEmail : ""
    };

    public render(): React.ReactNode {
        return (
            <div style={{marginBottom: 5}}>
                <Comment content={this.props.comment.content}
                         datetime={moment(this.props.comment.commentTime).calendar()}
                         actions={
                             [
                                 <span onClick={() => this.setState({enabledEditor: !this.state.enabledEditor})}>
                                    {this.state.enabledEditor ? "取消" : "回覆"}
                                 </span>,
                                 <span onClick={() => this.setState({showBelowComment: !this.state.showBelowComment})}>
                                     {this.state.showBelowComment ? "隱藏回覆" : "查看回覆"}
                                 </span>
                             ]
                         }
                         author={<a>來自: {this.getMessageFromEmail(this.props.comment)}</a>}
                >{
                    this.state.enabledEditor && this.props.email ?
                        <ForumCommentEditor
                            sendComment={this.props.sendComment}
                            email={this.props.email}
                            userType={this.props.userType}
                            forum={this.props.forum}
                            comment={this.props.comment}
                            releasement={this.props.releasement}
                        /> : ""
                }
                    {
                        this.state.showBelowComment ? this.props.children : ""
                    }
                </Comment>

            </div>
        )
    }
};