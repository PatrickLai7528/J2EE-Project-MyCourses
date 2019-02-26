import * as React from "react";
import CourseDisplay from "./CourseDisplay";
import {Button, Divider, Icon, Input, message, Modal} from "antd";
import {ICourse} from "../../types/entities";
import {UserType} from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {fromApprovalStateToChinese} from "../../types/enums";
import ReleaseCourseFormContainer from "../ReleaseCourseForm/ReleaseCourseFormContainer";
import {ISendReleasementData} from "../../api/CourseAPI";

export interface ICourseDisplayContainerProps {
    userType: UserType
    email?: string
    courseList: ICourse[]
    /**
     *
     * @param courseName
     * @param email
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAddCourse: (
        courseName: string,
        email: string,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void

    sendCourseRelease: (
        data: ISendReleasementData,
        onBefore?: () => void,
        onSuccess?: (response: IAPIResponse<any>) => void,
        onFail?: (response: IAPIResponse<any>) => void,
        onError?: (e: any) => void) => void

}

interface ICourseDisplayContainerState {
    addCourseModalVisible: boolean
    addCourseConfirmLoading: boolean

    releaseCourseModalVisible: boolean
    releaseCourseConfirmLoading: boolean
    isTimeToSubmitReleaseCourse: boolean
    addingCourseName?: string
    releasingCourse?: ICourse
}

export default class CourseDisplayContainer extends React.Component<ICourseDisplayContainerProps, ICourseDisplayContainerState> {
    public constructor(props: ICourseDisplayContainerProps) {
        super(props);
        this.state = {
            addCourseModalVisible: false,
            addCourseConfirmLoading: false,

            releaseCourseModalVisible: false,
            releaseCourseConfirmLoading: false,
            isTimeToSubmitReleaseCourse: false
        }
    }

    private openAddCourseModal(): void {
        this.setState({addCourseModalVisible: true});
    }

    private handleAddCourseOK(): void {
        if (!this.state.addingCourseName) {
            message.warn("課程名稱不能為空");
        } else {
            if (!this.props.email) {
                console.log("email 為空");
                return;
            }
            this.props.sendAddCourse(
                this.state.addingCourseName,
                this.props.email,
                // onBefore
                () => {
                    this.setState({addCourseConfirmLoading: true})
                },
                // onSuccess
                (response: IAPIResponse<any>) => {
                    message.success(response.message)
                    this.setState({addCourseConfirmLoading: false});
                    this.setState({addCourseModalVisible: false});
                },
                // onFail
                (response: IAPIResponse<any>) => {
                    message.error(response.message);
                    this.setState({addCourseConfirmLoading: false});
                    this.setState({addCourseModalVisible: false});
                },
                // onError
                (e: any) => {
                    message.error("發生未知錯誤，請稍候再試");
                    this.setState({addCourseConfirmLoading: false});
                    this.setState({addCourseModalVisible: false});
                }
            )
        }
    }

    private handleAddCourseCancel(): void {
        this.setState({addCourseModalVisible: false})
    }

    public handleReleaseCourseOK(): void {
        this.setState({isTimeToSubmitReleaseCourse: true})
        // this.setState({releaseCourseModalVisible: false})
    }

    public handleReleaseCourseCancel(): void {
        this.setState({releaseCourseModalVisible: false})
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h1>
                    待發佈課程
                </h1>
                <Divider/>
                <Button
                    htmlType="button"
                    type="primary"
                    style={{marginBottom: 16}}
                    onClick={this.openAddCourseModal.bind(this)}
                >創建課程</Button>
                <CourseDisplay
                    courseList={this.props.courseList}
                    okToRelease={(course: ICourse) => {
                        this.setState({
                            releasingCourse: course,
                            releaseCourseModalVisible: true
                        })
                    }}
                    notOkToRelease={(course: ICourse) => {
                        message.warn(fromApprovalStateToChinese(course.approvalState) + "課程不能發佈！")
                    }}
                    okToDelete={(course: ICourse) => {
                        message.success("刪除" + course.name);
                    }}
                    notOkToDelete={(course: ICourse) => {
                        message.success(course.name + "已通過，不能刪除");
                    }}
                />
                <Modal
                    title="創建課程"
                    visible={this.state.addCourseModalVisible}
                    onOk={this.handleAddCourseOK.bind(this)}
                    confirmLoading={this.state.addCourseConfirmLoading}
                    onCancel={this.handleAddCourseCancel.bind(this)}
                    maskClosable={true}
                    okText="確定"
                    cancelText="取消"
                >
                    <Input
                        prefix={<Icon type="highlight"/>}
                        placeholder="課程名稱"
                        onBlur={(e: any) => {
                            this.setState({addingCourseName: e.target.value})
                        }}
                    />
                </Modal>
                <Modal
                    title="發佈課程"
                    visible={this.state.releaseCourseModalVisible}
                    onOk={this.handleReleaseCourseOK.bind(this)}
                    confirmLoading={this.state.releaseCourseConfirmLoading}
                    onCancel={this.handleReleaseCourseCancel.bind(this)}
                    maskClosable={true}
                    okText="確定"
                    cancelText="取消"
                >
                    {/*Our own form will be presented here*/}
                    {
                        this.state.releasingCourse ?
                            <ReleaseCourseFormContainer
                                course={this.state.releasingCourse}
                                isTimeToSubmit={this.state.isTimeToSubmitReleaseCourse}
                                sendCourseRelease={this.props.sendCourseRelease}
                                onReleaseBefore={() => {
                                    this.setState({
                                        isTimeToSubmitReleaseCourse: false,
                                        releaseCourseConfirmLoading: true
                                    })
                                }}
                                onReleaseSuccess={(response: IAPIResponse<any>) => {
                                    message.success(response.message);
                                    this.setState({
                                        isTimeToSubmitReleaseCourse: false,
                                        releaseCourseConfirmLoading: false,
                                        releaseCourseModalVisible: false,
                                    })
                                }}
                                onReleaseFail={(response: IAPIResponse<any>) => {
                                    message.error(response.message);
                                    this.setState({
                                        isTimeToSubmitReleaseCourse: false,
                                        releaseCourseConfirmLoading: false,
                                        releaseCourseModalVisible: false,
                                    })
                                }}
                                onReleaseError={(response: IAPIResponse<any>) => {
                                    message.error(response.message);
                                    this.setState({
                                        releaseCourseConfirmLoading: false,
                                        releaseCourseModalVisible: false,
                                    })
                                }}
                            />
                            : ""
                    }
                </Modal>
            </div>
        )
    }
}