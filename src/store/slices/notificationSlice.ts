import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationPayload } from '@/lib/types';

interface NotificationState {
    list: NotificationPayload[];
}

const initialState: NotificationState = {
    list: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationPayload>) => {
            state.list.unshift(action.payload); // add to beginning
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notif = state.list.find(n => n.id === action.payload);
            if (notif) notif.read = true;
        },
    },
});

export const { addNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
