import {Button, Form, message} from "antd";
import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import {ISendCommentData} from "../../api/ForumAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {UserType} from "../../api/UserAPI";
import {IComment, IForum, IReleasement} from "../../types/entities";
import {ISendCommentProps, UserStateProps} from "../App/SendActionProps";

export type BaseComment = "BaseComment";

export interface IForumCommentEditorProps extends UserStateProps, ISendCommentProps {
    forum: IForum
    comment: IComment | BaseComment
    releasement: IReleasement
}

interface IForumCommentEditorState {
    content?: string
    confirmLoading: boolean
}

export class ForumCommentEditor extends React.Component<IForumCommentEditorProps, IForumCommentEditorState> {

    public constructor(props: IForumCommentEditorProps) {
        super(props);
        this.state = {confirmLoading: false}
    }

    private handleTextAreaChange(e: any): void {
        this.setState({content: e.target.value})
    }

    private handleButtonClick(): void {
        if (!this.state.content) {
            message.warn("回覆不能為空");
            return;
        }
        if (!this.props.email) return;
        let data: ISendCommentData = {
            fid: this.props.forum.fid,
            content: this.state.content,
            messageFrom: this.props.email,
            rid: this.props.releasement.rid
        };
        if (this.props.comment !== "BaseComment") {
            data.replyTo = this.props.comment.cmid;
        }

        this.props.sendComment(data, {
                // on before
                onBefore: () => {
                    this.setState({confirmLoading: true})
                },
                // on success
                onSuccess: (response: IAPIResponse<any>) => {
                    message.success(response.message);
                    // this.setState({confirmLoading: false, content: ""});
                },
                // on fail
                onFail: (response: IAPIResponse<any>) => {
                    message.warn(response.message);
                    // this.setState({confirmLoading: false, content: ""});
                },
                // on error
                onError: (response: IAPIResponse<any>) => {
                    message.error(response.message);
                    // this.setState({confirmLoading: false, content: ""});
                }
            }
        )
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Form.Item>
                    <TextArea rows={1} onChange={this.handleTextAreaChange.bind(this)}/>
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={this.state.confirmLoading}
                        htmlType="submit"
                        type="primary"
                        onClick={this.handleButtonClick.bind(this)}
                    >
                        回覆
                    </Button>
                </Form.Item>
            </div>
        )
    }
}