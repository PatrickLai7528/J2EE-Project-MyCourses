import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement, ISelection} from "../../types/entities";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";

export interface ISelectionDisplayProps {
    userType: UserType
    email: string

    selection: ISelection

    setDisplayingForum: (forum: IForum) => void
}

export const SelectionDisplay: React.FunctionComponent<ISelectionDisplayProps> = (props: ISelectionDisplayProps) => {
    return (
        <div>
            <ReleasementManageContainer
                userType={props.userType}
                email={props.email}
                releasement={props.selection.releasementEntity}
                setDisplayingForum={props.setDisplayingForum}
            />
        </div>
    )
}
