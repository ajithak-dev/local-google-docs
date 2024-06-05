import React, { useState } from 'react';
import './NewCard.css';
import {useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const NewCard = () => {
  const [noteName, setNoteName] = useState("");
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleTitleChange = (event) => {
    setNoteName(event.target.value);
    console.log(noteName)
  };

  const handleContentChange = (content) => {
    setNote(content);
    console.log(note)
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await axios.post(`http://localhost:8000/note/newnote/${noteName}`, { filename: noteName, note: JSON.stringify(note) });
      setMessage("Note saved successfully!");
      console.log("Note saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Error saving note");
    } finally {
      setIsSaving(false);
      history('/')
    }
  };

  return (
    <div className="newcard">
      <input type='text' name='title' value={noteName} onChange={handleTitleChange} className="input-class" placeholder="Enter note title" />
      <ReactQuill
        value={note}
        onChange={handleContentChange}
        style={{ height: "400px" }}
      />
      <button className="btn-save" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewCard;
