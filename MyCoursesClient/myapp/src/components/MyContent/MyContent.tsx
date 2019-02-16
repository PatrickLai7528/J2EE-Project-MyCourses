import * as React from "react";
import {Component} from "react";
import './MyContent.css';
import {Layout} from 'antd';
// import CompetitionSimpleBlock from "./../CompetitionSimpleBlock/CompetitionSimpleBlock";
import {Redirect, Route, Switch} from 'react-router-dom'
import CompetitionCalendar from "./../CompetitionCalendar/CompetitionCalendar"
import CompetitionDisplay from "./../CompetitionDisplay/CompetitionDisplay"
import DefaultHome from "../DefaultHome/DefaultHome";
import Setting from "../Setting/Setting";


export default class MyContent extends Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Layout.Content style={{marginLeft: "80px", marginRight: "80px", marginTop: "20px"}}>
                <Switch>
                    <Route exact path="/home" component={DefaultHome}/>
                    <Route exact path="/calendar" component={CompetitionCalendar}/>
                    <Route exact path="/display/:type" component={CompetitionDisplay}/>
                    <Route exact path="/setting" component={Setting}/>
                    <Redirect to="/home"/>
                </Switch>
            </Layout.Content>
        );
    }
}

