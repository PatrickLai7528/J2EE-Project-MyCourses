import * as React from "react";
import {Button, Card, Empty, Tree} from "antd";
import {IReleasement, ISlide} from "../../types/entities";

export interface IReleasementManageSlideProps {
    releasement: IReleasement
    editable: boolean
    onClick: () => void
}

const DirectoryTree = Tree.DirectoryTree;
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
    console.log(ret)
    return ret;
}

export const ReleasementManageSlide: React.FunctionComponent<IReleasementManageSlideProps> = (props: IReleasementManageSlideProps) => {
    console.log("releasement");
    console.log(props);
    return (
        <div>
            <h1>
                課件
            </h1>
            {
                props.editable ? (
                    <Button style={{marginBottom: 24}} htmlType={"button"} type={"primary"}
                            onClick={props.onClick}>上傳課件</Button>
                ) : ""
            }
            {/*{*/}
            {/*props.releasement.slideEntityList ?*/}
            {/*categorySlide(props.releasement.slideEntityList) : ""*/}
            {/*}*/}
            <Card>
                {
                    !props.releasement.slideEntityList || props.releasement.slideEntityList.length === 0 ?
                        <Empty/>
                        :
                        <Tree
                            multiple={true}
                            defaultExpandAll={true}
                            showLine={true}
                        >

                            {
                                props.releasement.slideEntityList ?
                                    categorySlide(props.releasement.slideEntityList).categorySlideFolderList
                                        .map((folder: ICategorizedSlideFolder) => {
                                            return (
                                                <TreeNode key={folder.name} title={folder.name}>
                                                    {
                                                        folder.slideList.map((slide: ISlide) => {
                                                            return (
                                                                <TreeNode key={String(slide.sid)}
                                                                          title={slide.filePath}/>
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
};