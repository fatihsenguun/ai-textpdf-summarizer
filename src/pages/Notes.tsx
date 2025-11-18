import React from 'react'
import "../css/notes.css"
import NoteBox from '../components/NoteBox'
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import {clearNotes } from '../redux/slices/noteSlice';


function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector((state: RootState) => state.notes.notes);
    const removeAll= ()=>{
        dispatch(clearNotes());

    }
   
    return (
        <div className='notesPage'>
            <div className='row justify-content-center mt-4'>
                
                <div className='col-12 col-lg-8 notesMain'>

               
                    <div className='noteTop'>
                        <h2 className='title'>My Notes</h2>

                        <button onClick={removeAll} className='removeButton'>
                            Remove 
                        </button>
                    </div>

               
                    {notes.length === 0 ? ( <p className='place'>No notes yet.</p> ) : (
                        notes.map((note, idx) => (
                            <NoteBox
                                key={idx}
                                noteIndex={idx}
                                header={note.header}
                                summary={note.summary}
                                questions={note.questions}/>
                        ))
                    )}

                </div>
            </div>
        </div>
    )
}

export default Notes