import * as React from "react";
import {ReleasementManage} from "./ReleasementManage";
import {UserType} from "../../api/UserAPI";
import {IForum, IReleasement} from "../../types/entities";
import {FormOption} from "../GeneralAddingModal/GeneralAddingModal";
import {IAppForStudentState, IAppForTeacherState} from "../App/App";
import {AssignmentSimpleDisplayContainer} from "../AssignmentSimpleDisplay/AssignmentSimpleDisplayContainer";
import {SlideSimpleDisplayContainer} from "../SlideSimpleDisplay/SlideSimpleDisplayContainer";
import {ForumSimpleDisplayContainer} from "../ForumSimpleDisplay/ForumSimpleDisplayContainer";

export interface IReleasementManageContainerProps {
    forTeacher?: IAppForTeacherState
    forStudent?: IAppForStudentState
    userType: UserType
}

interface IReleasementManageContainerState {
    generalModalMode: FormOption
    generalModalVisible: boolean
    generalModalConfirmLoading: boolean


    isTimeToSubmitAssignment: boolean
    isTimeToSubmitSlide: boolean
    isTimeToSubmitForum: boolean

    refreshFormTrigger: boolean
}

export default class ReleasementManageContainer extends React.Component<IReleasementManageContainerProps, IReleasementManageContainerState> {

    public constructor(props: IReleasementManageContainerProps) {
        super(props);
        this.state = {
            generalModalMode: FormOption.ASSIGNMENT,
            generalModalConfirmLoading: false,
            generalModalVisible: false,
            isTimeToSubmitAssignment: false,
            isTimeToSubmitSlide: false,
            isTimeToSubmitForum: false,
            refreshFormTrigger: false
        }
    }

    private enableAssignmentAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.ASSIGNMENT});
    }


    private enableSlideAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.SLIDE});
    }

    private enableForumAddingForm(): void {
        this.setState({generalModalVisible: true, generalModalMode: FormOption.FORUM});
    }

    public render(): React.ReactNode {
        const {userType, forTeacher, forStudent} = this.props;
        let email: string | undefined;
        let releasement: IReleasement | undefined;
        let setDisplayingForum: ((forum: IForum) => void) | undefined;
        if (userType === "teacher" && forTeacher && forTeacher.managingReleasement) {
            email = forTeacher.email;
            releasement = forTeacher.managingReleasement;
            setDisplayingForum = forTeacher.setDisplayingForum;
        } else if (userType === "student" && forStudent && forStudent.displayingSelection) { // userType === student
            email = forStudent.email;
            releasement = forStudent.displayingSelection.releasementEntity;
            setDisplayingForum = forStudent.setDisplayingForum;
        }

        if (email && releasement && setDisplayingForum) {
            return (
                <div>
                    <ForumSimpleDisplayContainer userType={userType} forStudent={forStudent} forTeacher={forTeacher}/>
                    <AssignmentSimpleDisplayContainer userType={userType} forTeacher={this.props.forTeacher}
                                                      forStudent={this.props.forStudent}/>
                    <SlideSimpleDisplayContainer userType={userType} forStudent={this.props.forStudent}
                                                 forTeacher={this.props.forTeacher}/>
                    <ReleasementManage
                        editable={this.props.userType === "teacher"}
                        releasement={releasement}
                        onAssignmentClick={this.enableAssignmentAddingForm.bind(this)}
                        onSlideClick={this.enableSlideAddingForm.bind(this)}
                        onForumClick={this.enableForumAddingForm.bind(this)}

                        setDisplayingForum={setDisplayingForum}
                    />
                    {/*<GeneralAddingModal*/}
                    {/*userType={this.props.userType}*/}
                    {/*email={this.props.email}*/}

                    {/*mode={this.state.generalModalMode}*/}
                    {/*refreshFormTrigger={this.state.refreshFormTrigger}*/}
                    {/*releasement={this.props.releasement}*/}

                    {/*sendAssignment={this.props.sendAssignment ? this.props.sendAssignment : () => {*/}
                    {/*}}*/}
                    {/*sendSlide={this.props.sendSlide ? this.props.sendSlide : () => {*/}
                    {/*}}*/}
                    {/*sendForum={this.props.sendForum ? this.props.sendForum : () => {*/}
                    {/*}}*/}

                    {/*confirmLoading={this.state.generalModalConfirmLoading}*/}
                    {/*visible={this.state.generalModalVisible}*/}

                    {/*// these are the trigger to submit the form submit*/}
                    {/*isTimeToSubmitAssignment={this.state.isTimeToSubmitAssignment}*/}
                    {/*isTimeToSubmitSlide={this.state.isTimeToSubmitSlide}*/}
                    {/*isTimeToSubmitForum={this.state.isTimeToSubmitForum}*/}

                    {/*onOk={() => {*/}
                    {/*// to trigger the form submit*/}
                    {/*switch (this.state.generalModalMode) {*/}
                    {/*case FormOption.ASSIGNMENT:*/}
                    {/*this.setState({isTimeToSubmitAssignment: true});*/}
                    {/*break;*/}
                    {/*case FormOption.SLIDE:*/}
                    {/*this.setState({isTimeToSubmitSlide: true});*/}
                    {/*break;*/}
                    {/*case FormOption.FORUM:*/}
                    {/*this.setState({isTimeToSubmitForum: true});*/}
                    {/*break;*/}
                    {/*}*/}
                    {/*}}*/}

                    {/*onCancel={() => {*/}
                    {/*this.setState({*/}
                    {/*generalModalVisible: false,*/}
                    {/*refreshFormTrigger: !this.state.refreshFormTrigger*/}
                    {/*})*/}
                    {/*}}*/}

                    {/*onSendBefore={() => {*/}
                    {/*// should set false here*/}
                    {/*// otherwise it will submit again and again*/}
                    {/*switch (this.state.generalModalMode) {*/}
                    {/*case FormOption.ASSIGNMENT:*/}
                    {/*this.setState({isTimeToSubmitAssignment: false});*/}
                    {/*break;*/}
                    {/*case FormOption.SLIDE:*/}
                    {/*this.setState({isTimeToSubmitSlide: false});*/}
                    {/*break;*/}
                    {/*case FormOption.FORUM:*/}
                    {/*this.setState({isTimeToSubmitForum: false});*/}
                    {/*break;*/}

                    {/*}*/}

                    {/*this.setState({generalModalConfirmLoading: true})*/}
                    {/*}}*/}

                    {/*onSendSuccess={(response: IAPIResponse<any>) => {*/}
                    {/*switch (this.state.generalModalMode) {*/}
                    {/*case FormOption.ASSIGNMENT:*/}
                    {/*this.setState({isTimeToSubmitAssignment: false});*/}
                    {/*break;*/}
                    {/*case FormOption.SLIDE:*/}
                    {/*this.setState({isTimeToSubmitSlide: false});*/}
                    {/*break;*/}
                    {/*case FormOption.FORUM:*/}
                    {/*this.setState({isTimeToSubmitForum: false});*/}
                    {/*break;*/}
                    {/*}*/}
                    {/*this.setState({*/}
                    {/*generalModalVisible: false,*/}
                    {/*generalModalConfirmLoading: false*/}
                    {/*});*/}
                    {/*message.success(response.message);*/}
                    {/*}}*/}

                    {/*onSendFail={(response: IAPIResponse<any>) => {*/}
                    {/*switch (this.state.generalModalMode) {*/}
                    {/*case FormOption.ASSIGNMENT:*/}
                    {/*this.setState({isTimeToSubmitAssignment: false});*/}
                    {/*break;*/}
                    {/*case FormOption.SLIDE:*/}
                    {/*this.setState({isTimeToSubmitSlide: false});*/}
                    {/*break;*/}
                    {/*case FormOption.FORUM:*/}
                    {/*this.setState({isTimeToSubmitForum: false});*/}
                    {/*break;*/}
                    {/*}*/}
                    {/*this.setState({*/}
                    {/*generalModalVisible: false,*/}
                    {/*generalModalConfirmLoading: false,*/}
                    {/*refreshFormTrigger: !this.state.refreshFormTrigger*/}
                    {/*});*/}
                    {/*message.success(response.message);*/}
                    {/*}}*/}

                    {/*onSendError={(e: any) => {*/}
                    {/*switch (this.state.generalModalMode) {*/}
                    {/*case FormOption.ASSIGNMENT:*/}
                    {/*this.setState({isTimeToSubmitAssignment: false});*/}
                    {/*break;*/}
                    {/*case FormOption.SLIDE:*/}
                    {/*this.setState({isTimeToSubmitSlide: false});*/}
                    {/*break;*/}
                    {/*case FormOption.FORUM:*/}
                    {/*this.setState({isTimeToSubmitForum: false});*/}
                    {/*break;*/}
                    {/*}*/}
                    {/*console.log(e);*/}
                    {/*this.setState({*/}
                    {/*generalModalVisible: false,*/}
                    {/*generalModalConfirmLoading: false,*/}
                    {/*refreshFormTrigger: !this.state.refreshFormTrigger*/}
                    {/*});*/}
                    {/*message.error("發生未知錯誤，請稍候再試")*/}
                    {/*}}*/}
                    {/*/>*/}
                </div>
            );
        } else
            return null;
    }
}