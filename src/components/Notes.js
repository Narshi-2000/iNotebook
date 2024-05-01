import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";
import '../App.css';

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes, getNotes, editNote} = context;
  let navigate = useNavigate(); 
  useEffect(()=>{
    if(localStorage.getItem("token")){
        getNotes();
    }else{
        navigate("/login");
    }
    
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currnote) =>{
    ref.current.click();
    setNote({id: currnote._id, etitle: currnote.title, edescription: currnote.description, etag: currnote.tag});
  }

  const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""});
  const onChange =(e) =>{
    setNote({
        ...note, [e.target.name]: e.target.value
    })
  }
  const handleClick =(e) =>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  }

  return (
    <>
        <AddNote showAlert={props.showAlert}/>
       
        <button ref={ref} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-5">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" value={note.etitle}  minLength ={5} required name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" value= {note.edescription} minLength ={5} required name="edescription" onChange={onChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag}  minLength ={5} required onChange={onChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{display:"flex", justifyContent:"space-around"}}>
                        <button ref={refClose} type="button" className="btn btn-custom-2" data-bs-dismiss="modal">Close</button>
                        <button type="button" disabled={note.etitle.length< 5 || note.edescription.length<5} className="btn btn-custom-2" onClick= {handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="container row my-3">
            <h2 style={{fontSize:25, fontWeight:700, padding:20, borderBottom:"1px solid grey"}}>Your Notes</h2>
            <div className="container mx-2 minLength ={5} required "> {notes.length ===0 &&'No Notes to display'} </div>
            {notes.map((note)=>{
            return <NoteItem key={note._id} updateNote = {updateNote} note={note} showAlert={props.showAlert}/>;
            })}  
        </div>
    </>
    
  )
}

export default Notes
