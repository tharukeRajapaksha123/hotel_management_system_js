
const express = require("express");
const router = express.Router();

const Transport_Tour = require("../models/transport_model");
const mongoose = require("mongoose");

//create
router.post("/create-transport-tour", (req, res, next) => {
   const { vehicle_type, customer_name, location_address,mobile_number ,employee_id } = req.body;
   const r = new Transport_Tour(
      {
         _id: new mongoose.Types.ObjectId(),
         vehicle_type,
         customer_name,
         location_address,
         mobile_number,
         date: Date.now(),
         employee_id
      }
   );
   return r
      .save()
      .then((Transport_Tour) => res.status(200).json({ Transport_Tour }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Transport_Tour.find()
      .then(Transport_Tours => res.status(200).json({ Transport_Tour_count: Transport_Tours.length, Transport_Tours }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Transport_Tour.findById(__id)
      .then((Transport_Tour) => {
         if (Transport_Tour) return res.status(200).json(Transport_Tour)
         else return res.status(404).json({ message: "Transport_Tour not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-transport-tour/:id", (req, res, next) => {
   const __id = req.params.id;
   return Transport_Tour.findById(__id)
      .then((Transport_Tour) => {
         if (Transport_Tour) {
            Transport_Tour.set(req.body);
            return Transport_Tour
               .save()
               .then((Transport_Tour) => {
                  return res.status(200).json({ Transport_Tour });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Transport_Tour not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-transport-tour/:id", (req, res, next) => {
   const __id = req.params.id;
   return Transport_Tour.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})


module.exports = router