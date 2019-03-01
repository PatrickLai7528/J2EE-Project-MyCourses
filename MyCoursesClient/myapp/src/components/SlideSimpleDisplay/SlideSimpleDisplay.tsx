import * as React from "react";
import {ISlide} from "../../types/entities";
import {Button, Card, Empty, Tree} from "antd";
import NetworkSettings from "../../setting/NetworkSettings";
import {IReleasementManageSlideProps} from "../ReleasementManage/ReleasementManageSlide";

export interface ISlideDisplayProps {
    addSlideButton?: React.ReactNode
    slideList: ISlide[]
}

export interface ISlideDisplayState {
    checkedKeys: string[]; // must be the file name of slide
}

const {TreeNode} = Tree;

interface ICategorizedSlideResult {
    categorySlideFolderList: ICategorizedSlideFolder[]
}

interface ICategorizedSlideFolder {
    name: string,
    slideList: ISlide[]
}


export class SlideSimpleDisplay extends React.Component<ISlideDisplayProps, ISlideDisplayState> {
    public constructor(props: ISlideDisplayProps) {
        super(props);
        this.state = {
            checkedKeys: []
        }
    }

    private categorizeSlide(slideList: ISlide[]): ICategorizedSlideResult {
        let map: Map<string, ICategorizedSlideFolder> = new Map();
        for (let slide of slideList) {
            let categorizedSlideFolder = map.get(slide.title);
            if (!categorizedSlideFolder)
                categorizedSlideFolder = {name: slide.title, slideList: []};
            categorizedSlideFolder.slideList.push(slide);
            map.set(slide.title, categorizedSlideFolder);
        }
        console.log(map);
        let ret: ICategorizedSlideResult = {categorySlideFolderList: []};
        map.forEach((value, key, map) => {
            ret.categorySlideFolderList.push(value)
        });
        return ret;
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>
                    課件
                </h1>
                {
                    this.props.addSlideButton
                }
                <Card extra={<a onClick={() => {
                    if (!this.state.checkedKeys || this.state.checkedKeys.length === 0 || !this.props.slideList) return;
                    let list: string[] = [];
                    for (let slide of this.props.slideList) {
                        if (this.state.checkedKeys.indexOf(slide.filePath) !== -1)
                            list.push(slide.filePath);
                    }
                    list.forEach((value: string) => {
                        // console.log("downloading " + value);
                        window.open(NetworkSettings.getOpenNetworkIP() + "/file/slide/download?fileName=" + value)
                    })
                }}>下載</a>}>
                    {
                        this.props.slideList.length === 0 ?
                            <Empty/>
                            :
                            <Tree
                                multiple={true}
                                defaultExpandAll={true}
                                showLine={true}
                                checkable={true}
                                // @ts-ignore
                                onCheck={(ck: string[]) => {
                                    const {checkedKeys} = this.state;
                                    ck.forEach((i => checkedKeys.push(i)));
                                    this.setState({checkedKeys: checkedKeys});
                                    // console.log(this.state);
                                }}
                            >

                                {
                                    this.categorizeSlide(this.props.slideList).categorySlideFolderList
                                        .map((folder: ICategorizedSlideFolder) => {
                                            return (
                                                <TreeNode key={folder.name} title={folder.name}>
                                                    {
                                                        folder.slideList.map((slide: ISlide) => {
                                                            return (
                                                                <TreeNode key={slide.filePath}
                                                                          title={slide.filePath}
                                                                          isLeaf={true}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </TreeNode>
                                            )
                                        })
                                }
                            </Tree>
                    }
                </Card>
            </ div>
        )
    }
}