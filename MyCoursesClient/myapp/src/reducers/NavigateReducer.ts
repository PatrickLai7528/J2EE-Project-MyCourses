import {IAppContext} from "../store/AppContext";
import {IReleasement, ISelection} from "../types/entities";

export interface INavigateReleasementPayload {
    releasement: IReleasement
}

export interface INavigateSelectionPayload {
    selection: ISelection
}

export class NavigateReducer {
    public static navigateReleasementTo(context: IAppContext, payload: INavigateReleasementPayload): IAppContext {
        if (context.forTeacher)
            return {
                ...context,
                forTeacher: {
                    ...context.forTeacher,
                    managingReleasement: payload.releasement
                }
            };
        return context;
    }

    public static navigateSelectionTo(context: IAppContext, payload: INavigateSelectionPayload): IAppContext {
        if (context.forStudent)
            return {
                ...context,
                forStudent: {
                    ...context.forStudent,
                    displayingSelection: payload.selection
                }
            };
        return context;
    }

}