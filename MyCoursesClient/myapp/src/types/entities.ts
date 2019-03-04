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

export interface IOutlineStatisticsForTeacher {
    created: number
    released: number
    selected: number
    commented: number
    uploaded: number
    published: number
}

export interface ISimplifyReleasementForTeacher {
    courseName: string
    effectiveTime: number
    deadTime: number
    selected: number
    uploaded: number
    published: number
    submitted: number
}

export interface ISemesterStatisticsForTeacher {
    semester: string
    created: number
    released: number
    selected: number
    simplifyReleasementList: ISimplifyReleasementForTeacher[]
}

export interface ISimplifySelectionForTeacher {
    studentName: string
    studentNo: string
    studentEmail: string
    selectTime: number
    studentScore: number
}

export interface IReleasementStatisticsForTeacher {
    courseName: string
    selected: number
    submitted: number
    downloaded: number
    commented: number
    simplifySelectionList: ISimplifySelectionForTeacher[]
}

export interface ITeacherStatistics {
    outlineStatistics: IOutlineStatisticsForTeacher
    semesterStatisticsList: ISemesterStatisticsForTeacher[]
    releasementStatisticsList: IReleasementStatisticsForTeacher[]
}

export interface IOutlineStatisticsForAdmin {
    student: number
    teacher: number
    studentTeacherProportion: number
    created: number
    released: number
    releasedCreatedProportion: number
    approved: number
    rejected: number
    rejectedApprovedProportion: number
    teacherRegistryLast7: number
    studentRegistryLast7: number
    allUserRegistryCompareToLast7: number
    teacherLogInLast7: number
    studentLogInLast7: number
    allUserLogInCompareToLast7: number
}

export interface ISimplifyCourseForAdmin {
    courseName: string
    addTime: number
    approvalState: ApprovalState
}

export interface ISimplifyReleasementForAdmin {
    courseName: string
    approvalState: ApprovalState
    limited: number
    selected: number
    dropped: number
    bySelected: number
    releaseTime: number
    effectiveTime: number
    deadTime: number
    avgScore: number
    failed: number
}

export interface ITeacherStatisticsForAdmin {
    teacherName: string
    teacherEmail: string
    created: number
    released: number
    rejected: number
    rejectedApprovedProportion: number
    selected: number
    fulledAllProportion: number
    droppedAllProportion: number
    bySelectedAllProportion: number
    simplifyCourseList: ISimplifyCourseForAdmin[]
    simplifyReleasementList: ISimplifyReleasementForAdmin[]
}

export interface ISimplifySelectionForAdmin {
    courseName: string
    selectedTime: number
    selectionState: SelectionState
    score: number
}

export interface IStudentStatisticsForAdmin {
    studentName: string
    studentEmail: string
    selected: number
    selectedAvgProportion: number
    dropped: number
    droppedAvgProportion: number
    loggedIn: number
    loggedInAvgProportion: number
    recentLogInTime: number
    registryTime: number
    simplifySelectionList: ISimplifySelectionForAdmin[]
}

export interface IAdminStatistics {
    outlineStatistics: IOutlineStatisticsForAdmin
    teacherStatisticsList: ITeacherStatisticsForAdmin[]
    studentStatisticsList: IStudentStatisticsForAdmin[]
}