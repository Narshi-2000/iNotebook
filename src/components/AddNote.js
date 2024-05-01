import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext";
import '../App.css'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""});

  const handleClick =(e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""});
    props.showAlert("Note added successfully", "success");
  }

  const onChange =(e) =>{
    setNote({
        ...note, [e.target.name]: e.target.value
    })
  }
  return (
    <div className="addnote-div">
      <div className="addnote my-3">
        <h1>Add a note</h1>
        <form className="my-5">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={5} required aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} minLength={5} required onChange={onChange}/>
          </div>
          <button disabled={note.title.length< 5 || note.description.length<5} type="submit" className="btn btn-custom-1" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
