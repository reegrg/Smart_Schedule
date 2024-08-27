const Notes = require("../models/notesModel");

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

const createNote = async(req, res) => {
    try{
        const {title, description, createdAt} = req.body;
        const note = new Notes({
            user: req.user.id,
            title,
            description,
            createdAt,
        });
        await note.save();
        return res
      .status(201)
      .json({ msg: "Note added successfully", note: note });
    } catch (error) {
        sendErrorResponse(res, error);
    }     
}

// controller for updating a notes

const updateNote = async (req, res) => {
  const { title, description, createdAt } = req.body;
  try {
      // Find the note and update it with the provided data
      const note = await Notes.findByIdAndUpdate(
          req.params.id,
          { title, description, createdAt: createdAt || new Date() }, // Use current date if createdAt is not provided
          { new: true, runValidators: true }
      );
      if (!note) {
          return res.status(404).json({ msg: "Note not found" });
      }
      return res.status(200).json({ msg: "Note updated successfully", note });
  } catch (error) {
      sendErrorResponse(res, error);
  }
};

  // controller for getting a notes

const getNotes = async (req, res) => {
  try {
    // use the authenticated user's id to fetch their notes
  const notes = await Notes.find({user: req.user.id});
    return res
      .status(200)
      .json({ msg: "Notes fetched successfully", notes });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllUserNotes = async (req, res) => {
  try{
    const notes = await Notes.find();
    return res
      .status(200)
      .json({msg: "All Notes fetched successfully!", notes});
  } catch (error) {
    sendErrorResponse(res, error);
  }
}

const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    return res.status(200).json({ msg: "Note deleted successfully" });
  } catch (error) {
   sendErrorResponse(res, error);
  }
};


// For counting notes
const countNotes = async (req, res) => {
  try {
    const totalNotes = await Notes.countDocuments({user: req.user.id});
    return res.status(200).json({totalNotes});
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    note.favorite = !note.favorite; // Toggle favorite status
    await note.save();

    res.json({ msg: 'Favorite status updated', note });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Fetch favorite notes
const getFavoriteNotes = async (req, res) => {
  try {
    const notes = await Notes.find({favorite: true }); // Filter by favorite
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching favorite notes" });
  }
};


module.exports = {createNote, updateNote, getNotes, getAllUserNotes, deleteNote, countNotes, toggleFavorite, getFavoriteNotes};