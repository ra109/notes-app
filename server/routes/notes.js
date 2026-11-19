const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Note = require("../models/Note");

router.use(auth); // all note routes need login

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ message: "Invalid note id" });

// Get my notes
router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

// Create
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ message: "Title is required" });
    const note = await Note.create({ title, content, user: req.userId });
    res.status(201).json(note);
  } catch (err) { next(err); }
});

// View one
router.get("/:id", validId, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) { next(err); }
});

// Edit
router.put("/:id", validId, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ message: "Title is required" });
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) { next(err); }
});

// Delete
router.delete("/:id", validId, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) { next(err); }
});

module.exports = router;