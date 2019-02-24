import * as React from "react";
import {Button} from "antd";

export interface IReleasementManageSlideProps {
    editable:boolean
    onClick: () => void
}

export const ReleasementManageSlide: React.FunctionComponent<IReleasementManageSlideProps> = (props: IReleasementManageSlideProps) => {
    return (
        <div>
            <h1>
                課件
            </h1>
            {
                props.editable ? (<Button htmlType={"button"} type={"primary"} onClick={props.onClick}>上傳課件</Button>) : ""
            }
        </div>
    )
};