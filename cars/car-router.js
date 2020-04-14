const express = require("express");
const knex = require("knex");

const knexfile = require("../knexfile.js");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await db("cars");
    res.status(400).json({ data: cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const carData = req.body;
    const ids = await db("cars").insert(carData);
    const id = ids[0];
    const newCar = await db("cars").where({ id });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
