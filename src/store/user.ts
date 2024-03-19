import { createSlice } from "@reduxjs/toolkit";

export type User = {
    id: string,
    username: string,
    created_at: string
}

export interface UserState {
    user: null | undefined | User;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: undefined
    } as UserState,
    reducers: {
        setUser: (state: UserState, action: {payload: UserState["user"], type: string}) => {
            state.user = action.payload;
        }
    }
});

export const {setUser} = userSlice.actions;

export const userReducer = userSlice.reducer;
