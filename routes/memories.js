const express = require("express");
const router = express.Router();
const Memory = require("../models/Memories");
const { protect } = require("../middleware/jwtCheck");

router.get("/:id", protect, async (req, res) => {
  try {
    const memory = await Service.findById(req.params.id).populate("user");
    res.status(200).json(memory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const memories = await Service.find().populate("user");
    res.status(200).json(memories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { question, answer } = req.body;

    let memory = new Memory({
      question,
      answer,
      user: req.user.id,
    });

    await memory.save();

    res.status(201).json({ message: "Stored Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "The service has been deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
