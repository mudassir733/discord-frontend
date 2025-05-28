import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "@/components/status-indicator";

interface StatusState {
    statuses: Record<string, StatusType>;
}

const initialState: StatusState = {
    statuses: {},
};


const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        updateUserStatus(state, action: PayloadAction<{ userId: string; status: StatusType }>) {
            state.statuses[action.payload.userId] = action.payload.status;
        },
        clearStatus(state, action: PayloadAction<string>) {
            delete state.statuses[action.payload];
        },
        setInitialStatuses(state, action: PayloadAction<Record<string, StatusType>>) {
            state.statuses = action.payload;
        },
    },
});

export const { updateUserStatus, clearStatus, setInitialStatuses } = statusSlice.actions;
export default statusSlice.reducer;