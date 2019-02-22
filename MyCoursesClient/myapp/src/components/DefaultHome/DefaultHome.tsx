import * as React from "react";
import {Avatar, Button, Divider, List} from "antd";
import "./DefaultHome.css"
import CompetitionSimpleBlock from "../CompetitionBlock/CompetitionSimpleBlock";
import {CompetitionAPI, ICompetition} from "../../api/CompetitionAPI";
import IAPIResponse from "../../api/IAPIResponse";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

interface IDefaultHome {
    popularCompetition: ICompetition[]
}

export default class DefaultHome extends React.Component<any, IDefaultHome> {

    public constructor(props: any) {
        super(props);
        this.state = {popularCompetition: []}
    }

    public async componentDidMount() {
        const response: IAPIResponse<any> = await CompetitionAPI.getInstance().getPopular();
        if (response.isSuccess) {
            this.setState({popularCompetition: response.payload})
        }
    }


    public render(): React.ReactNode {
        return (
            <div>
                {/*<h1>最新比賽</h1>*/}
                {/*/!* Carousel for some competition*!/*/}
                {/*<Carousel*/}
                {/*autoplay={true}*/}
                {/*dots={true}*/}
                {/*adaptiveHeight={true}*/}
                {/*accessibility={true}*/}
                {/*arrows={true}*/}

                {/*>*/}
                {/*{*/}
                {/*this.state.popularCompetition.map((competition: ICompetition) => {*/}
                {/*if (competition.imagePath) {*/}
                {/*return (*/}
                {/*<div key={competition.name} style={{height: "100%"}}>*/}
                {/*<h1 style={{*/}
                {/*color: "black",*/}
                {/*height: 50,*/}
                {/*display: "flex",*/}
                {/*flexDirection: "column",*/}
                {/*flexWrap: "nowrap",*/}
                {/*justifyContent: "center"*/}
                {/*}}>{competition.name}</h1>*/}
                {/*<div style={{*/}
                {/*height: "100%",*/}
                {/*display: "flex",*/}
                {/*flexDirection: "row",*/}
                {/*flexWrap: "nowrap",*/}
                {/*justifyContent: "center",*/}
                {/*}}>*/}
                {/*<img height={490}*/}
                {/*src={ImageUtils.getOkToSendPath(competition.imagePath[0])}/>*/}
                {/*</div>*/}
                {/*</div>)*/}
                {/*} else*/}
                {/*return "";*/}
                {/*}*/}
                {/*)*/}
                {/*}*/}
                {/*</Carousel>*/}
                {/*<Divider orientation="right" style={{fontSize: "9px"}}>我是有底線的</Divider>*/}
                <h1>熱門比賽</h1>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignContent: "stretch"
                }}>
                    {
                        this.state.popularCompetition.map((competition: ICompetition, index: number) => {
                            if (competition.imagePath && index < 3)
                                return (
                                    <CompetitionSimpleBlock
                                        key={competition.name}
                                        style={{
                                            margin: "15px",
                                            alignSelf: "flex-start"
                                        }}
                                        competition={competition}
                                        imagePath={competition.imagePath[0]}/>
                                );
                            else
                                return "";
                        })
                    }
                </div>
                <Divider orientation="right" style={{fontSize: "9px"}}>我是有底線的</Divider>
                <h1>來自爬蟲</h1>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item: any) => (
                        <List.Item actions={[<Button htmlType="button" type="primary">前往來源</Button>]}
                                   style={{background: "white", borderRadius: "10px", margin: "5px"}}>
                            <List.Item.Meta
                                avatar={<Avatar
                                    style={{margin: "5px"}}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
                <Divider orientation="right" style={{fontSize: "9px"}}>我是有底線的</Divider>
            </div>
        )
    }
}