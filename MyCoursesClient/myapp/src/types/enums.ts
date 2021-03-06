export enum ApprovalState {
    REJECTED,
    WAITING,
    APPROVED,
}

export enum ByteUnit {
    KB, MB, GB
}

export function toByteUnit(str: string): ByteUnit {
    switch (str) {
        case "KB":
            return ByteUnit.KB;
        case "MB":
            return ByteUnit.MB;
        case "GB":
            return ByteUnit.GB;
        default:
            throw new Error("Unexpected ByteUnit")
    }
}

export function fromByteUnitToString(byteUnit: ByteUnit): string {
    switch (byteUnit) {
        case ByteUnit.KB:
            return "KB";
        case ByteUnit.MB:
            return "MB";
        case ByteUnit.GB:
            return "GB";
        default:
            throw new Error("Unexpected ByteUnit")
    }
}

export function toApprovalState(str: string): ApprovalState {
    switch (str) {
        case "WAITING":
            return ApprovalState.WAITING;
        case "REJECTED":
            return ApprovalState.REJECTED;
        case "APPROVED":
            return ApprovalState.APPROVED;
        default:
            throw new Error("Unexpect ApprovalState");
    }
}

export function toSelectionState(str: string): SelectionState {
    switch (str) {
        case "ADDED":
            return SelectionState.ADDED;
        case "OVER":
            return SelectionState.OVER;
        case "DROPPED":
            return SelectionState.DROPPED;
        case "MISS":
            return SelectionState.MISS;
        case "BY_SELECTED":
            return SelectionState.BY_SELECTED;
        case "SELECTED":
            return SelectionState.SELECTED;
        default:
            throw new Error("Unexpect ApprovalState");
    }
}


export function fromApprovalStateToChinese(state: ApprovalState): string {
    switch (state) {
        case ApprovalState.WAITING:
            return "等待審批";
        case ApprovalState.APPROVED:
            return "通過審批";
        case ApprovalState.REJECTED:
            return "取消課程";
        default:
            throw new Error("Unexpected ApprovalState");
    }
}

export enum SelectionState {
    ADDED,
    OVER,
    DROPPED,
    MISS,
    BY_SELECTED,
    SELECTED
}

export function fromSelectionStateToChinese(state:SelectionState):string {
    switch (state) {
        case SelectionState.SELECTED:
            return "選課成功";
        case SelectionState.BY_SELECTED:
            return "補選成功";
        case SelectionState.MISS:
            return "未抽取";
        case SelectionState.DROPPED:
            return "已退課";
        case SelectionState.OVER:
            return "超過限制人數，等待抽籤";
        case SelectionState.ADDED:
            return "加入名單，等待開課";
        default:
            throw new Error();
    }
}