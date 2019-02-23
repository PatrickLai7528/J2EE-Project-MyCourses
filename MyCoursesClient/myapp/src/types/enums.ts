export enum ApprovalState {
    REJECTED,
    WAITING,
    APPROVED,
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


export function toChinese(state: ApprovalState): string {
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