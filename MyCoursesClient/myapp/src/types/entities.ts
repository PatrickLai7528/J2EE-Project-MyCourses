import {ApprovalState, SelectionState} from "./enums";

export interface IAdmin {
    adminEmail: string,
    password: string
}

export interface IStudent {
    studentEmail: string,
    password: string,
    studentNo: string,
    name: string
}

export interface ITeacher {
    teacherEmail: string,
    name: string,
    password: string,
    teacherNo: string
}

export interface ICourse {
    cid: number,
    name: string,
    teacherEntity: ITeacher
    approvalState: ApprovalState,
}

export interface IAssignment {
    assid: number,
    title: string,
    description: string,
    slideEntity: ISlide
}

export interface IComment {
    cmid: number,
    content: number,
    messageFrom: string,
}

export interface IForum {
    fid: number,
    topic: string,
    commentEntityList: IComment[]
}

export interface IReportCard {
    rcid: number,
    reportCardItemList: IReportCardItem[]
}

export interface IReportCardItem {
    rciid: number,
    studentNo: string,
    score: number
}

export interface ISelection {
    slid: number,
    releasementEntity: IReleasement,
    studentEntity: IStudent,
    selectionState: SelectionState
}

export interface ISlide {
    sid: number,
    title: string,
    filePath: string
}

export interface IReleasement {
    rid: number,
    approvalState: ApprovalState,
    courseEntity: ICourse,
    reportCardEntity?: IReportCard,
    slideEntityList?: ISlide[],
    assignmentEntityList?: IAssignment[],
    forumEntityList?: IForum[]
    startHour: number,
    startMin: number,
    endHour: number,
    endMin: number,
    repeatAfterDay: number,
    limitNumber: number
    effectiveTime: number,
    deadTime: number,
}