import * as React from "react";
import {IReleasement, ISelection} from "../../types/entities";
import IAPIResponse from "../../api/IAPIResponse";
import CourseAPI from "../../api/CourseAPI";
import {Divider, message, Spin} from "antd";
import ReleasementDisplay from "./ReleasementDisplay";
import {UserType} from "../../api/UserAPI";
import SelectionAPI from "../../api/SelectionAPI";
import ReleasementAPI from "../../api/ReleasementAPI";

export interface IReleamentDisplayContainerProps {
    userType: UserType,
    email: string | undefined
    releasementList: IReleasement[]
    /**
     *
     * @param email
     * @param rid
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendCourseSelection: (email: string, rid: number,
                          onBefore?: () => void,
                          onSuccess?: (response: IAPIResponse<any>) => void,
                          onFail?: (response: IAPIResponse<any>) => void,
                          onError?: (e: any) => void) => void
}

interface IReleasementDisplayContainerState {
    // releasementListOfStudent: IReleasement[]
    // isLoading: boolean
    isCourseSelectionSending: boolean
}

export default class ReleasementDisplayContainer extends React.Component<IReleamentDisplayContainerProps, IReleasementDisplayContainerState> {
    public constructor(props: IReleamentDisplayContainerProps) {
        super(props);
        this.state = {
            // releasementListOfStudent: [],
            // isLoading: false,
            isCourseSelectionSending: false
        }
    }

    /**
     * the reason of fetching here instead of in App.tsx: noted at 2019-02-22
     *      - no other place use the releasement
     */
    // public componentDidMount() {
    //     this.setState({isLoading: true});
    //     ReleasementAPI.getInstance().getAllReleasement()
    //         .then((response: IAPIResponse<IReleasement[]>) => {
    //             if (response.isSuccess) {
    //                 if (response.payload)
    //                     this.setState({releasementListOfStudent: response.payload, isLoading: false})
    //             } else {
    //                 message.error(response.message);
    //                 this.setState({isLoading: false})
    //             }
    //         })
    //         .catch((e: any) => {
    //             console.log(e);
    //         })
    // }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>所有課程</h1>
                <Divider/>
                {/*<Spin spinning={this.state.isLoading}>*/}
                <ReleasementDisplay
                    isCourseSelectionSending={this.state.isCourseSelectionSending}
                    releasementList={this.props.releasementList}
                    sendSelectAction={(releasement: IReleasement) => {
                        console.log(this.props);
                        if (!(this.props.userType === "student") || !this.props.email) {
                            message.error("請先登錄");
                        } else {
                            let onBefore = () => {
                                this.setState({isCourseSelectionSending: true})
                            };
                            let onSuccess = (response: IAPIResponse<any>) => {
                                message.success(response.message);
                                this.setState({isCourseSelectionSending: false})
                            };
                            let onFail = (response: IAPIResponse<any>) => {
                                message.error(response.message);
                                this.setState({isCourseSelectionSending: false})
                            };
                            let onError = (e: any) => {
                                message.error("發生未知錯誤，請稍候再試");
                                this.setState({isCourseSelectionSending: false})
                            };
                            this.props.sendCourseSelection(this.props.email, releasement.rid, onBefore, onSuccess, onFail, onError);
                            // this.props.sendCourseSelection(
                            //     this.props.email,
                            //     releasement.rid,
                            //     // onBefore
                            //     ()=>{
                            //       this.setState({isCourseSelectionSending:true})
                            //     },
                            //     // onSuccess
                            //     (response:IAPIResponse<any>)=>{
                            //
                            //     },
                            //     // onFail
                            //     (response :IAPIResponse<any>)={},
                            //     // onError
                            //     (e:any)=>{
                            //
                            //     }
                            // )
                            // SelectionAPI.getInstance().sendSelection(this.props.email, String(releasement.rid))
                            //     .then((response: IAPIResponse<any>) => {
                            //         if (response.isSuccess) {
                            //             message.success(response.message);
                            //         } else {
                            //             message.error(response.message);
                            //         }
                            //     })
                            //     .catch((e: any) => {
                            //         console.log(e);
                            //         message.error("出現未知錯誤，請稍候再試！");
                            //     })
                        }
                    }}
                />
                {/*</Spin>*/}
            </div>
        )
    }
}