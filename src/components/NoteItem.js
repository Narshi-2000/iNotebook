import React,{useContext} from 'react'
import noteContext from "../context/notes/NoteContext";
import '../App.css';

const NoteItem = (props) => {
  const  {note, updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;

  return (
    <div className ="col-md-3">
        <div className="card my-4">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className="icons">
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully", "success");}} style={{fontSize:22, color:"red", fontWeight:700}}></i>
                <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} style={{fontSize:22, color:"blue", fontWeight:700}}></i>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default NoteItem
