const express = require("express");
const router = express.Router();
const Memory = require("../models/Memories");
const { protect } = require("../middleware/jwtCheck");

router.get("/:id", protect, async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id).populate("user");
    res.status(200).json(memory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const memories = await Memory.find().populate("user");
    res.status(200).json(memories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, location, description } = req.body;

    console.log(req);

    let memory = new Memory({
      name,
      location,
      description,
      user: req.user._id,
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
    await Memory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "The service has been deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
