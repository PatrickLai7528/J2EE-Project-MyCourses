import * as React from "react";
import {Button, Card, Empty, List} from "antd";
import {IForum, IReleasement} from "../../types/entities";
import {NavLink} from "react-router-dom";

export interface IReleasementManageForumProps {
    releasement: IReleasement
    onClick: () => void
    setDisplayingForum: (forum: IForum) => void
}

export const ReleasementManageForum: React.FunctionComponent<IReleasementManageForumProps> = (props: IReleasementManageForumProps) => {
    console.log(props);
    return (
        <Card title={"討論區"} style={{borderRadius: 10}} extra={<a onClick={props.onClick}>發起討論</a>}>
            {
                !props.releasement.forumEntityList || props.releasement.forumEntityList.length === 0 ?
                    <Empty/>
                    :
                    <List
                        size="small"
                        bordered={false}
                        dataSource={props.releasement.forumEntityList}
                        renderItem={(forum: IForum) => (
                            <NavLink to={"/forum"} onClick={() => {
                                props.setDisplayingForum(forum);
                            }}><List.Item>{forum.topic}</List.Item></NavLink>)}
                    />
            }
        </Card>
    )
};