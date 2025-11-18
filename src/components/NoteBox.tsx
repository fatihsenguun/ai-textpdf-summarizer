import React from 'react'
import "../css/components.css"
import { useDispatch, useSelector } from "react-redux";
import { removeNote } from '../redux/slices/noteSlice';
import { useNavigate } from 'react-router-dom';

interface NoteBoxProps {
    key: number;
    noteIndex: number;
    header: string;
    summary: string;
    questions: string[];
}


const NoteBox: React.FC<NoteBoxProps> = ({ noteIndex, header, summary, questions }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const removeBox = () => {
        dispatch(removeNote(noteIndex))
    }


    return (

     <div className="noteBoxModern row " >
            <div className='col-11 '  onClick={() => navigate("/notes/" + noteIndex)} >
                <div className="noteMain">
                <h5 className="noteHeader">{header}</h5>
            </div>

            </div>
            <div className='col-1'> <button className="deleteBtn" onClick={removeBox}>×</button></div>
           
        </div>

    )
}

export default NoteBox