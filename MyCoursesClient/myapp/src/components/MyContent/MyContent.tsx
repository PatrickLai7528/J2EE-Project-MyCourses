import * as React from "react";

import {Layout} from "antd";
import {Route, Switch} from "react-router";
import LogIn from "../LogIn/LogIn";
import {EditProfile} from "../EditProfile/EditProfile";

export const MyContent = () => {
    return (
        <Layout.Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff', textAlign: 'center',minHeight:"700px"}}>
                <Switch>
                    <Route exact={true} path={"/login"} component={LogIn}/>
                    <Route exact={true} path={"/profile"} component={EditProfile}/>
                </Switch>
            </div>
        </Layout.Content>
    )
}