import * as React from "react";
import {Icon} from "antd";

export interface IIconTextProps {
    type: string,
    text: string | React.ReactNode
}

export const IconText: React.FunctionComponent<IIconTextProps> = (props: IIconTextProps) => (
    <span>
    <Icon type={props.type} style={{marginRight: 8}}/>
        {props.text}
  </span>
);