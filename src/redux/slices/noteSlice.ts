import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteItem {
    header: string;
    summary: string;
    questions: string[];
}
export interface NoteState {
    notes: NoteItem[];
}
const initialState: NoteState = {
    notes: [],
}

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<NoteItem>) => {
            state.notes.push(action.payload);
        },
        removeNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter((_, index) => index !== action.payload);

        },
        clearNotes: (state) => {
            state.notes = [];
        },


    },
})

export const { addNote, removeNote, clearNotes } = noteSlice.actions;
export default noteSlice.reducer