import * as React from "react";
import {Button, Icon, Upload} from "antd";
import {UploadFile} from "antd/lib/upload/interface";

export interface IMyUploadProps {
    // trueSubmit: (fileList: UploadFile[]) => void
    setValue: (fileList: string[]) => void
}


interface IMyUploadState {
    fileList: UploadFile[]
}

export default class MyUpload extends React.Component<IMyUploadProps, IMyUploadState> {
    constructor(props: IMyUploadProps) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    // private fileToBase64Image(): string[] {
    //     const fileList: UploadFile[] = this.state.fileList;
    //     let ret: string[] = [];
    //     for (let file of fileList) {
    //         let reader = new FileReader();
    //         if (file.originFileObj) {
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = (e: any) => {
    //                 ret.push(e.target.result);
    //             }
    //
    //         }
    //     }
    //     return ret;
    // }

    private customRequest() {
        // if (!this.state.fileList[0]) return;
        // const data = this.state.fileList[0].originFileObj;
        // ImageAPI.getInstance().postImage(data).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err);
        // });
        console.log(this.state.fileList);
        console.log("handle request");
        // let base64Images: string[] = this.fileToBase64Image();
    }

    // console.log(base64Images);

    private handleChange({file, fileList}: any) {
        const myFileList = this.state.fileList;
        file.status = "done";
        myFileList.push(file);
        this.setState({fileList: myFileList});
        console.log("handle changing");
        let base64Images: string[] = [];
        for (let file of this.state.fileList) {
            if (file.originFileObj) {
                let fileReader: FileReader = new FileReader();
                fileReader.readAsDataURL(file.originFileObj);
                fileReader.onload = (e: any) => {
                    base64Images.push(e.target.result);
                    if (base64Images.length === this.state.fileList.length) {
                        this.props.setValue(base64Images);
                    }
                }
            }
        }
    }

    private handleRemove(file: UploadFile): boolean {
        const {fileList} = this.state;
        fileList.splice(fileList.indexOf(file), 1);
        this.setState({fileList: fileList});
        return true;
    }

    public render(): React.ReactNode {
        // const props = {
        //     action: '//jsonplaceholder.typicode.com/posts/',
        //     onChange: this.handleChange,
        //     multiple: true,
        // };
        return (
            <Upload
                action={"//jsonplaceholder.typicode.com/posts/"}
                accept={"image/*"}
                customRequest={this.customRequest.bind(this)}
                multiple={true}
                fileList={this.state.fileList}
                showUploadList={true}
                onChange={this.handleChange.bind(this)}
                onRemove={this.handleRemove.bind(this)}
            >
                <Button>
                    <Icon type="upload"/> Upload
                </Button>
            </Upload>
        );
    }
}