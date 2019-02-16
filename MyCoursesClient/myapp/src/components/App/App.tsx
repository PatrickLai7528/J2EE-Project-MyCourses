import * as React from "react";
import {Component} from "react";
import './App.css';
import {
    Layout
} from 'antd';

import MyContent from "./../MyContent/MyContent";
import MySider from "../MySider/MySider";
import MyHeader from "./../MyHeader/MyHeader";

export default class App extends Component {

    render() {
        return (
            <Layout>
                <MyHeader/>
                <Layout>
                    <MySider/>
                    <Layout>
                        <MyContent/>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

