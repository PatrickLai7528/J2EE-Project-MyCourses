import {ApprovalState, ByteUnit, SelectionState} from "./enums";

export interface IAdmin {
    adminEmail: string,
    password: string
}

export interface IStudent {
    studentEmail: string,
    password: string,
    studentNo: string,
    name: string
    registryTime: number
}

export interface ITeacher {
    teacherEmail: string,
    name: string,
    password: string,
    teacherNo: string
    registry: number
}

export interface ICourse {
    cid: number,
    name: string,
    teacherEntity: ITeacher
    approvalState: ApprovalState,
    isReleased: boolean
    releasedTime: number
}

export interface IAssignment {
    assid: number,
    title: string,
    description: string,
    ddl: number
    fileSize: IFileSize
    slideEntity: ISlide
    submissionEntityList: ISubmission[]
    addTime: number
}

export interface ISubmission {
    smid: number,
    studentEntity: IStudent,
    filePath: string
    submitTime: number
}

export interface IFileSize {
    size: number,
    unit: ByteUnit
}

export interface IComment {
    cmid: number,
    content: number,
    messageFromTeacher?: ITeacher, // if exists, it means it commented by a teacher
    messageFromStudent?: IStudent, // if exists, it means it commented by a student
    belowCommentList?: IComment[]
    commentTime: number;
}

export interface IForum {
    fid: number,
    topic: string,
    commentEntityList: IComment[]
    questionerTeacher?: ITeacher,
    questionerStudent?: IStudent
    addTime: number
}


export interface ISelection {
    slid: number,
    releasementEntity: IReleasement,
    studentEntity: IStudent,
    selectionState: SelectionState
    selectTime: number
    score: number
}

export interface ISlide {
    sid: number,
    title: string,
    filePath: string
    uploadTime: number
}

export interface IReleasement {
    rid: number,
    releaseTime: number
    approvalState: ApprovalState,
    courseEntity: ICourse,
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