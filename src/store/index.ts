import { configureStore } from "@reduxjs/toolkit";
import { UserState, userReducer } from "./user";

export type State = {
    user: UserState
};

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});
