import React, {createContext, FunctionComponent, useContext, useMemo, useReducer} from "react";

interface ContextInterface {
    id?: number;
    role?: number;
}

interface ActionInterface {
    type: "setUser";
    payload: ContextInterface;
}

type DispatchInterface = (action: ActionInterface) => void;

const UserContext = createContext<
       {
            state: ContextInterface;
            dispatch: DispatchInterface;
        } | undefined
    >(undefined);

const reducerUser = ( state: ContextInterface, action: ActionInterface): ContextInterface => {
    switch (action.type) {
        case "setUser":
            return { ...state, id: action.payload.id ? action.payload.id : Number(localStorage.getItem('user_id')),
                               role: action.payload.role ? action.payload.role : Number(localStorage.getItem('user_role'))};
        default:
            throw new Error('Invalid action type in context');
    }
};

const UserProvider: FunctionComponent = ( {children} ) => {
    const [state, dispatch] = useReducer(reducerUser, {});
    const memoizedUser = useMemo( () => ({state, dispatch}), [state, dispatch] );


    return (
        <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
}

export { UserProvider, useUser };
