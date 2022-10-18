const express = require("express");
const router = express.Router();

const Wedding = require("../models/wedding_model");
const mongoose = require("mongoose");
//create
router.post("/create-wedding", (req, res, next) => {
   const { customer_id, wedding_location, num_of_guests, date } = req.body;
   const r = new Wedding(
      {
         _id: new mongoose.Types.ObjectId(),
         customer_id,
         wedding_location,
         num_of_guests,
         date,
      }
   );
   return r
      .save()
      .then((Wedding) => res.status(200).json({ Wedding }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Wedding.find()
      .then(Weddings => res.status(200).json({ Wedding_count: Weddings.length, Weddings }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Wedding.findById(__id)
      .then((Wedding) => {
         if (Wedding) return res.status(200).json(Wedding)
         else return res.status(404).json({ message: "Wedding not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})




//update
router.put("/update-wedding/:id", (req, res, next) => {
   const __id = req.params.id;
   return Wedding.findById(__id)
      .then((Wedding) => {
         if (Wedding) {
            Wedding.set(req.body);
            return Wedding
               .save()
               .then((Wedding) => {
                  return res.status(200).json({ Wedding });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Wedding not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-wedding/:id", (req, res, next) => {
   const __id = req.params.id;
   return Wedding.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router