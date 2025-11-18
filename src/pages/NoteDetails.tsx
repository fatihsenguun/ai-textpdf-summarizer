import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../redux/store';

function NoteDetails() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const params = useParams();
  const note = notes[Number(params.id)];


  return (
    <div className="noteDetailsPage">

      <div className="row justify-content-center">
        <div className="col-11 col-md-10 col-lg-8">

          <div className="noteDetailsCard">

            <h1 className="noteTitle">{note.header}</h1>

            <h3 className="sectionTitle">Summary</h3>
            <p className="sectionText">{note.summary}</p>

            <h3 className="sectionTitle">Questions</h3>

            <div className="questionsList">
              {note.questions.map((question, index) => (
                <p key={index} className="questionItem">
                  • {question}
                </p>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default NoteDetails