const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//ROUTE 1: fetch all notes : GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error occurred");
  }
});


//ROUTE 2: Add notes : POST: "/api/notes/addnote" . login required
router.post("/addnote",fetchuser , 
//[
//     body("title", "Enter a valid title").isLength({ min: 3 }),
//     body("description", "description must be atleast 5 characters").isLength({min: 5})],
  async (req, res) => {
    
    try {
      // if there are errors ,return bad request and the errors
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }

      //creating a note model from request data
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);

    } catch (error) {
      res.status(500).send("Internal server error occurred");
    }
  }
);

//ROUTE 3: update notes PUT: "/api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async(req, res) =>{
  const { title, description, tag } = req.body;

  try{
  //create a new note
  const note = {};
  if(title){note.title = title;}
  if(description){note.description = description;}
  if(tag){note.tag= tag;}

  //check whether the user can update the note
  let oldnote = await Note.findById(req.params.id);
  if(!oldnote){
    return res.status(404).send("Not found");
  }

  if(oldnote.user.toString() != req.user.id){
    return res.status(401).send("Not allowed");
  }

  // update it
  oldnote = await Note.findByIdAndUpdate(req.params.id, {$set: note}, {new: true});
  res.json(note);

  }catch(error){
    res.status(500).send("Internal server error occurred");
  }
  
})

//Route 4: delete notes DELETE: "/api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async(req, res) => {

  try{
  //find the note to be deleted
  let oldnote =await Note.findById(req.params.id);
  if(!oldnote){
    return res.status(404).send("Not found");
  }

  //does user own the note
  if(oldnote.user.toString() != req.user.id){
    return res.status(401).send("NOT ALLOWED");
  }

  //delete the note
  oldnote = await Note.findByIdAndDelete(req.params.id);
  res.json({"success" : "Note has been deleted"});

  }catch(error){
    res.status(500).send("Internal server error occurred");
  }
})

module.exports = router;
