import * as React from "react";
import {Button, Card, Empty, Tree} from "antd";
import {IReleasement, ISlide} from "../../types/entities";
import NetworkSettings from "../../setting/NetworkSettings";
import axios from "axios";

export interface IReleasementManageSlideProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}

const {TreeNode} = Tree;

interface ICategorizedSlideResult {
    categorySlideFolderList: ICategorizedSlideFolder[]
}

interface ICategorizedSlideFolder {
    name: string,
    slideList: ISlide[]
}


const categorySlide = (slideList: ISlide[]): ICategorizedSlideResult => {
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
    // for (let item of map) {
    //     console.log(item);
    //     ret.categorySlideFolderList.push(item.);
    // }
    map.forEach((value, key, map) => {
        ret.categorySlideFolderList.push(value)
    });
    return ret;
};

interface IReleasementManageSlideState {
    checkedKeys: string[]; // must be the file name of slide
}

export class ReleasementManageSlide extends React.Component<IReleasementManageSlideProps, IReleasementManageSlideState> {
    public constructor(props: IReleasementManageSlideProps) {
        super(props);
        this.state = {
            checkedKeys: []
        }
    }

    public render(): React.ReactNode {
        // @ts-ignore
        // @ts-ignore
        return (
            <div>
                <h1>
                    課件
                </h1>
                {
                    this.props.editable ? (
                        <Button style={{marginBottom: 24}} htmlType={"button"} type={"primary"}
                                onClick={this.props.onClick}>上傳課件</Button>
                    ) : ""
                }
                {/*{*/}
                {/*props.releasement.slideEntityList ?*/}
                {/*categorySlide(props.releasement.slideEntityList) : ""*/}
                {/*}*/}
                <Card extra={<a>下載</a>}>
                    {
                        !this.props.releasement.slideEntityList || this.props.releasement.slideEntityList.length === 0 ?
                            <Empty/>
                            :
                            <Tree
                                multiple={true}
                                defaultExpandAll={true}
                                showLine={true}
                                checkable={true}
                                // // @ts-ignore
                                // onCheck={(ck: string[]) => {
                                //     const {checkedKeys} = this.state;
                                //     ck.forEach((i => checkedKeys.push(i)));
                                //     this.setState({checkedKeys: checkedKeys});
                                //     console.log(this.state);
                                // }}
                            >

                                {
                                    this.props.releasement.slideEntityList ?
                                        categorySlide(this.props.releasement.slideEntityList).categorySlideFolderList
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
                                            }) : ""
                                }
                            </Tree>
                    }
                </Card>
            </div>
        )
    }
}

//
// export const ReleasementManageSlide1: React.FunctionComponent<IReleasementManageSlideProps> = (props: IReleasementManageSlideProps) => {
//     console.log("releasement");
//     console.log(props);
//     return (
//         <div>
//             <h1>
//                 課件
//             </h1>
//             {
//                 props.editable ? (
//                     <Button style={{marginBottom: 24}} htmlType={"button"} type={"primary"}
//                             onClick={props.onClick}>上傳課件</Button>
//                 ) : ""
//             }
//             {/*{*/}
//             {/*props.releasement.slideEntityList ?*/}
//             {/*categorySlide(props.releasement.slideEntityList) : ""*/}
//             {/*}*/}
//             <Card>
//                 {
//                     !props.releasement.slideEntityList || props.releasement.slideEntityList.length === 0 ?
//                         <Empty/>
//                         :
//                         <Tree
//                             multiple={true}
//                             defaultExpandAll={true}
//                             showLine={true}
//                             checkable={true}
//                             onSelect={(checkedKeys: string[]) => {
//                                 console.log("on select")
//                                 console.log(checkedKeys);
//                                 axios.get(NetworkSettings.getOpenNetworkIP() + "/file/slide/download?fileName=" + checkedKeys[0])
//                             }}
//                         >
//
//                             {
//                                 props.releasement.slideEntityList ?
//                                     categorySlide(props.releasement.slideEntityList).categorySlideFolderList
//                                         .map((folder: ICategorizedSlideFolder) => {
//                                             return (
//                                                 <TreeNode key={folder.name} title={folder.name}>
//                                                     {
//                                                         folder.slideList.map((slide: ISlide) => {
//                                                             return (
//                                                                 <TreeNode key={slide.filePath}
//                                                                           title={slide.filePath}
//                                                                           isLeaf={true}
//                                                                 />
//                                                             )
//                                                         })
//                                                     }
//                                                 </TreeNode>
//                                             )
//                                         }) : ""
//                             }
//                         </Tree>
//                 }
//             </Card>
//         </div>
//     )
// };