import React from "react";
import noteContext from './NoteContext';
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial =[
       
    ]

    const [notes, setNotes] =useState(notesInitial);
    //get all notes
    const getNotes = async() =>{
        //fetch all notes via api
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            }
          });
        const json=await response.json(); 
        console.log(json);
        setNotes(json);
    }

    //add a note
    const addNote = async(title, description, tag) =>{
        //fetch notes via api
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
          });
        const note= await response.json(); 
        
        //add a note in client
        setNotes(notes.concat(note))
    }

    //delete a note
    const deleteNote =async(id) =>{
        //fetch notes via api
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            }
          });
        const json= await response.json(); 
        console.log(json);
        
        //delete note in client
        setNotes(notes.filter((note)=>{return note._id!==id}));
    }

    //edit a note 
    const editNote = async(id, title, description, tag) =>{
        //fetch notes via api
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
          });
        const json= await response.json(); 
        console.log(json);
        //update note in client
        let newNotes = JSON.parse(JSON.stringify(notes)); //deep copy
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState