import * as React from "react";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement, ISelection} from "../../types/entities";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";
import {UserStateProps} from "../App/GeneralProps";

export interface ISelectionDisplayProps extends UserStateProps {
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
