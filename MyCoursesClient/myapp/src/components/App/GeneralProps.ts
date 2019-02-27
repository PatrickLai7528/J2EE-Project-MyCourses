import {UserType} from "../../api/UserAPI";
import {ISendAssignmentData} from "../../api/AssignmentAPI";
import IAPIResponse from "../../api/IAPIResponse";

export interface UserStateProps {
    userType: UserType
    email?: string
}

export interface ISendAssignmentProps {
    /**
     * send assignment callback
     * @param data
     * @param onBefore
     * @param onSuccess
     * @param onFail
     * @param onError
     */
    sendAssignment: (data: ISendAssignmentData,
                     onBefore?: () => void,
                     onSuccess?: (response: IAPIResponse<any>) => void,
                     onFail?: (response: IAPIResponse<any>) => void,
                     onError?: (e: any) => void) => void
}