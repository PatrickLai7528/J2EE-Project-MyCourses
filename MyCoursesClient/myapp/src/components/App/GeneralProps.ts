import {UserType} from "../../api/UserAPI";

export interface UserStateProps {
    userType: UserType
    email?: string
}