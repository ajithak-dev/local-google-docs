import React, { useEffect, useState } from "react";
import "./Note.css";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Delete } from "../Components/delete";

const Note = () => {
  const { notename } = useParams();
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();

  useEffect(() => {
    console.log(`Fetching note: ${notename}`);
    axios.get(`http://localhost:8000/note/${notename}`)
      .then((response) => {
        console.log("Fetched note data:", response.data);
        setNote(response.data.note || response.note);
        setNoteTitle(removeTxtExtension(response.data.title || response.title));
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [notename]);

  const removeTxtExtension = (filename) => {
    return filename.replace(/\.txt$/, '');
  };

  const handleContentChange = (content) => {
    setNote(content);
  };

  const handleSave = () => {
    setIsSaving(true);
    axios.put(`http://localhost:8000/note/${notename}`, { updatenote: note })
      .then((response) => {
        setMessage("Note saved successfully!");
        console.log("Note saved successfully:", response.data);
        setIsSaving(false);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
        setMessage("Error saving note");
        setIsSaving(false);
      });
  };

  const handleDelete = () => {
    Delete(notename, history); // Pass history to Delete function
  };

  return (
    <div className="note-container">
      <h2>Title : {noteTitle}</h2>
      <ReactQuill
        value={note}
        onChange={handleContentChange}
        style={{ height: "400px" }}
      />
      <button className="btn-save-note" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      <button className="btn-delete" onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Note;
