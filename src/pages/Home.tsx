import React, { useEffect } from 'react'
import Header from '../components/header'
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useState } from "react";
import NoteBox from '../components/NoteBox';
import { addNote, clearNotes } from '../redux/slices/noteSlice';



function Home() {

  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [file, setFile] = useState<File | null>(null);
const [loadingText, setLoadingText] = useState(false);
const [loadingPDF, setLoadingPDF] = useState(false);





  const handleSend = async () => {


    if (!input.trim()) return;
    setLoadingText(true);
    setOutput("");

    try {

      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),

      })
      const data1 = await response.json();
      if (!data1) { }
      else {
        const newNote = {
          header: data1.header,
          summary: data1.summary,
          questions: data1.questions,
        };

        dispatch(addNote(newNote));
      }

      console.log(notes);




    } catch (error) {
      console.error("fetch error", error);
      setOutput("error!!");
    } finally {
      setLoadingText(false);
      alert();



    }


  }

  const pdfSend = async () => {
 
    if (!file) {
      console.log("PDF seçilmedi!");
      return;
    }
       setLoadingPDF(true);

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await fetch("http://localhost:3000/api/chat-pdf", {
        method: "POST",
        body: formData,
      })
      const data2 = await response.json();
      if (!data2) { }
      else {
        const newNote = {
          header: data2.header,
          summary: data2.summary,
          questions: data2.questions,
        };

        dispatch(addNote(newNote));
        console.log(newNote);
      }






    } catch (error) {
      console.error("PDF gönderim hatası:", error);
      setOutput("PDF gönderiminde hata oluştu!");
    } finally {
      setLoadingPDF(false);
      alert();



    }



  }


  const alert = (() => {


    if (!loading) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }




  })







  return (

    <div className='home'>

      <div className='homeDiv'>
        <div className="alertDiv">
          <div className={` ${showAlert ? "alert alert-success" : ""}`} role="alert">
            {showAlert ? "Summary generated successfully!" : ""}
          </div>
        </div>



        <div className='card'>
          <h2 className='title'>AI Note Summarizer</h2>
          <p className='homeText'>
           Enter text below and let the AI analyze and summarize it.
          </p>

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)} placeholder="Type or paste your text here..." className='homeInput' />

          <button onClick={handleSend}
            disabled={loading}
            className={`sendButton ${loadingText ? "sendButtonInactive" : ""}`}  >
            {loadingText ? "Processing..." : "Summarize TEXT"}
          </button>

        </div>
        <div className='card'>
            
          <input  id="files"  onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }

          }} type="file" placeholder='Select File' />
          
          <button onClick={pdfSend}
            disabled={loadingPDF}
            className={`pdfButton ${loadingPDF ? "pdfButtonInactive" : ""}`}  >
            {loadingPDF ? "Processing..." : "Summarize PDF"} </button>

        </div>

      </div>


    </div>
  )
}

export default Home
