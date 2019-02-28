import * as React from "react";
import {IAppContext} from "../../store/AppContext";
import {AppContext} from "../App/App";

export const withContext = <P extends {}>(Component: React.ComponentType<P>) =>
    class WithContext extends React.PureComponent<P & IAppContext> {
        render() {
            return (
                <AppContext.Consumer>
                    {(context: any) => <Component {...this.props} {...context} />}
                </AppContext.Consumer>
            );
        }
    };