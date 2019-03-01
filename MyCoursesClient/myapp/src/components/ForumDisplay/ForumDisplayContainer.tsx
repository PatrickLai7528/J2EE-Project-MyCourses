import * as React from "react";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {Card, Divider} from "antd";
import {ForumComment, IForumCommentProps} from "./ForumComment";
import {ForumCommentEditor, IForumCommentEditorProps} from "./ForumCommentEditor";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {UserType} from "../../api/UserAPI";

export interface IForumDisplayProps {
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    userType: UserType
}

const showBelowComment = (commentList: IComment[] | undefined, props: IForumCommentProps): React.ReactNode => {
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

export class ForumDisplayContainer extends React.Component<IForumDisplayProps, IForumDisplayState> {

    public constructor(props: IForumDisplayProps) {
        super(props);
        this.state = {enableEditor: false}
    }

    public render(): React.ReactNode {
        const {userType, forTeacher, forStudent} = this.props;
        let commentProps: any;
        let editorProps: any;

        if (userType === "teacher" && forTeacher && forTeacher.displayingForum && forTeacher.managingReleasement) {
            commentProps = {
                email: forTeacher.email,
                forum: forTeacher.displayingForum,
                sendComment: forTeacher.sendComment,
                userType: userType,
                releasement: forTeacher.managingReleasement
            };
            editorProps = {
                forum: forTeacher.displayingForum,
                sendComment: forTeacher.sendComment,
                comment: "BaseComment",
                releasement: forTeacher.managingReleasement,
                userType: userType
            }
        } else if (userType === "student" && forStudent && forStudent && forStudent.displayingForum && forStudent.displayingSelection) {
            commentProps = {
                email: forStudent.email,
                forum: forStudent.displayingForum,
                sendComment: forStudent.sendComment,
                userType: userType,
            };
            editorProps = {
                forum: forStudent.displayingForum,
                sendComment: forStudent.sendComment,
                comment: "BaseComment",
                releasement: forStudent.displayingSelection.releasementEntity,
                userType: userType
            };
            if (forStudent.displayingSelection)
                commentProps.releasement = forStudent.displayingSelection.releasementEntity;
        }
        return (
            <div>
                <h1>{"討論區"}</h1>
                <Divider/>
                <Card title={commentProps.forum.topic}
                      extra={<a onClick={() => this.setState({enableEditor: true})}>留言</a>}>
                    {
                        commentProps.forum.commentEntityList.map((comment: IComment) => {
                            return (
                                <div key={comment.cmid} style={{marginBottom: 5}}>
                                    <ForumComment
                                        {...commentProps}
                                    >
                                        {
                                            showBelowComment(comment.belowCommentList, commentProps)
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
                            email={editorProps.email}
                            forum={editorProps.forum}
                            comment={"BaseComment"}
                            releasement={editorProps.releasement}
                            sendComment={editorProps.sendComment}
                        /> : ""
                    }
                </Card>
            </div>
        )
    }
}