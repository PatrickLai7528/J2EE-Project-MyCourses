import * as React from "react";
import {ReleasementManage} from "./ReleasementManage";
import {UserType} from "../../api/UserAPI";
import {IReleasement} from "../../types/entities";

export interface IReleasementManageContainerProps {
    userType: UserType
    email?: string
    releasement?: IReleasement
}

interface IReleasementManageContainerState {

}

export default class ReleasementManageContainer extends React.Component<IReleasementManageContainerProps, IReleasementManageContainerState> {

    public constructor(props: IReleasementManageContainerProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        if (this.props.email && this.props.releasement)
            return (
                <ReleasementManage
                    releasement={this.props.releasement}
                    userType={this.props.userType}
                    email={this.props.email}
                />
            );
        else
            return null;
    }
}