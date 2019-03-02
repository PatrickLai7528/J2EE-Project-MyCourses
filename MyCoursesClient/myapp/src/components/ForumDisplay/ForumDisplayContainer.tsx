import * as React from "react";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {Card, Divider} from "antd";
import {ForumComment, IForumCommentProps} from "./ForumComment";
import {ForumCommentEditor, IForumCommentEditorProps} from "./ForumCommentEditor";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {UserType} from "../../api/UserAPI";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import {ISendActionCallback} from "../App/GeneralProps";
import {ISendCommentData} from "../../api/ForumAPI";

export interface IForumDisplayProps {
    forStudent?: IAppForStudentState
    forTeacher?: IAppForTeacherState
    userType: UserType
}

//
// const showBelowComment = (commentList: IComment[] | undefined, props: IForumCommentProps): React.ReactNode => {
//     if (!commentList || commentList.length === 0) return null;
//     return (
//         commentList.map((comment: IComment) => {
//             return (
//                 <div key={comment.cmid} style={{marginBottom: 5}}>
//                     <ForumComment comment={comment}
//                                   userType={props.userType}
//                                   email={props.email}
//                                   forum={props.forum}
//                                   releasement={props.releasement}
//                                   sendComment={props.sendComment}
//                     >
//                         {showBelowComment(comment.belowCommentList, props)}
//                         {/*<Editor/>*/}
//                     </ForumComment>
//                 </div>
//             )
//         })
//     )
// };

interface IForumDisplayState {
    enableEditor: boolean
}

export class ForumDisplayContainer extends React.Component<IForumDisplayProps, IForumDisplayState> {

    public constructor(props: IForumDisplayProps) {
        super(props);
        this.state = {enableEditor: false}
    }


    public render(): React.ReactNode {
        return (
            <div>
                <h1>{"討論區"}</h1>
                <Divider/>
                <Card title={this.getForum().topic}
                      extra={<a onClick={() => this.setState({enableEditor: true})}>留言</a>}>
                    {
                        this.getCommentList().map((comment: IComment) => {
                            return (
                                <div key={comment.cmid} style={{marginBottom: 5}}>
                                    <ForumComment
                                        releasement={this.getReleasement()}
                                        email={this.getEmail()}
                                        userType={this.props.userType}
                                        sendComment={this.getSendComment()}
                                        comment={comment}
                                        forum={this.getForum()}
                                    >
                                        {
                                            this.showBelowComment(comment.belowCommentList)
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
                            email={this.getEmail()}
                            forum={this.getForum()}
                            comment={"BaseComment"}
                            releasement={this.getReleasement()}
                            sendComment={this.getSendComment()}
                        /> : ""
                    }
                </Card>
            </div>
        )
    }

    private getForum(): IForum {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "student" && forStudent && forStudent.displayingForum) {
            return forStudent.displayingForum
        }
        if (userType === "teacher" && forTeacher && forTeacher.displayingForum) {
            return forTeacher.displayingForum
        }

        throw new Error();
    }

    private getCommentList(): IComment[] {
        const {userType, forTeacher, forStudent} = this.props
        if (userType === "teacher" && forTeacher && forTeacher.displayingForum) {
            if (forTeacher.displayingForum.commentEntityList)
                return forTeacher.displayingForum.commentEntityList
            else return [];
        }
        if (userType === "student" && forStudent && forStudent.displayingForum) {
            if (forStudent.displayingForum.commentEntityList)
                return forStudent.displayingForum.commentEntityList;
            else return [];
        }

        throw new Error();
    }

    private getReleasement(): IReleasement {
        if (this.props.userType === "teacher" && this.props.forTeacher && this.props.forTeacher.managingReleasement) {
            return this.props.forTeacher.managingReleasement
        }

        if (this.props.userType === "student" && this.props.forStudent && this.props.forStudent.displayingSelection) {
            return this.props.forStudent.displayingSelection.releasementEntity;
        }

        throw new Error();
    }

    private getEmail(): string {
        const {userType, forTeacher, forStudent} = this.props;
        if (userType === "student" && forStudent)
            return forStudent.email;
        if (userType === "teacher" && forTeacher)
            return forTeacher.email;
        throw new Error();
    }

    private getSendComment(): (data: ISendCommentData, callback?: ISendActionCallback) => void {
        if (this.props.userType === "teacher" && this.props.forTeacher) {
            return this.props.forTeacher.sendComment;
        }
        if (this.props.userType === "student" && this.props.forStudent) {
            return this.props.forStudent.sendComment;
        }
        throw new Error();
    }

    private showBelowComment(commentList: IComment[] | undefined) {
        if (!commentList || commentList.length === 0) return null;
        return (
            commentList.map((comment: IComment) => {
                return (
                    <div key={comment.cmid} style={{marginBottom: 5}}>
                        <ForumComment comment={comment}
                                      userType={this.props.userType}
                                      email={this.getEmail()}
                                      forum={this.getForum()}
                                      releasement={this.getReleasement()}
                                      sendComment={this.getSendComment()}
                        >
                            {this.showBelowComment(comment.belowCommentList)}
                            {/*<Editor/>*/}
                        </ForumComment>
                    </div>
                )
            })
        )
    }
}