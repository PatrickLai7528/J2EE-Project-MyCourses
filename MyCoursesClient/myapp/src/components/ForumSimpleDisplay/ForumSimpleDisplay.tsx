import * as React from "react";
import {Card, Empty, List} from "antd";
import {IForum} from "../../types/entities";
import {NavLink} from "react-router-dom";

export interface IForumSimpleDisplayProps {
    addForumButton: React.ReactNode
    forumList: IForum[]
    setDisplayingForum: (forum: IForum) => void
}

export const ForumSimpleDisplay: React.FunctionComponent<IForumSimpleDisplayProps> = (props: IForumSimpleDisplayProps) => {
    return (
        <Card title={"討論區"} style={{borderRadius: 10}} extra={props.addForumButton}>
            {
                !props.forumList || props.forumList.length === 0 ?
                    <Empty/>
                    :
                    <List
                        size="small"
                        bordered={false}
                        dataSource={props.forumList}
                        renderItem={(forum: IForum) => (
                            <NavLink to={"/forum"} onClick={() => {
                                props.setDisplayingForum(forum);
                            }}><List.Item>{forum.topic}</List.Item></NavLink>)}
                    />
            }
        </Card>
    )
}