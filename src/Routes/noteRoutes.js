const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {createNote, updateNote, deleteNote, getNotes, countNotes, getAllUserNotes, toggleFavorite, getFavoriteNotes} = require("../controllers/notesController");


router.post("/create", auth, createNote);
router.patch("/update/:id", auth, updateNote);
router.get("/all", auth, getNotes);
router.get("/get/all", getAllUserNotes);
router.delete("/delete/:id", auth, deleteNote);
router.get("/count/:id", auth, countNotes);
router.patch("/favorite/:id", auth, toggleFavorite);
router.get("/get/favorites", auth, getFavoriteNotes);

module.exports = router;