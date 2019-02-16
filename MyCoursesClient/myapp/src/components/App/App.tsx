import * as React from 'react';
import './App.css';
import {Layout} from "antd";
import MySider from "../MySider/MySider";
import {MyContent} from "../MyContent/MyContent";
import {MyHeader} from "../MyHeader/MyHeader";

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 fuck
//             </div>
//         );
//     }
// }
const {Footer} = Layout;
const App = () => (
    <Layout>
        <MySider/>
        <Layout style={{marginLeft: 200}}>
            {/*<MyHeader/>*/}
            <MyContent/>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
);

export default App;
