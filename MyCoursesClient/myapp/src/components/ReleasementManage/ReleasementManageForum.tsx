import * as React from "react";
import {Button, Card, Empty, List} from "antd";
import {IForum, IReleasement} from "../../types/entities";

export interface IReleasementManageForumProps {
    releasement: IReleasement
    onClick: () => void
}

export const ReleasementManageForum: React.FunctionComponent<IReleasementManageForumProps> = (props: IReleasementManageForumProps) => {
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
                        renderItem={(forum: IForum) => (<List.Item><a>{forum.topic}</a></List.Item>)}
                    />
            }
        </Card>
    )
}