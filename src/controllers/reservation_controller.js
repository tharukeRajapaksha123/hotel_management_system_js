const express = require("express");
const router = express.Router();

const ReserVation = require("../models/reservation_model");
const mongoose = require("mongoose");


//create
router.post("/create-reservation", (req,res, next) => {
   const { customer_name, customer_id, num_of_chairs } = req.body;
   const r = new ReserVation(
      {
         _id: new mongoose.Types.ObjectId(),
         customer_name,
         date: Date.now(),
         customer_id,
         num_of_chairs,

      }
   );
   return r
      .save()
      .then((reservation) => res.status(200).json({ reservation }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req,res, next) => {
   return ReserVation.find()
      .then(reservations => res.status(200).json({ reservation_count: reservations.length, reservations }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req,res, next) => {
   const __id = req.params.id;
   return ReserVation.findById(__id)
      .then((reservation) => {
         if (reservation) return res.status(200).json(reservation)
         else return res.status(404).json({ message: "reservation not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})





//update
router.put("/update-reservation/:id", (req,res, next) => {
   const __id = req.params.id;
   return ReserVation.findById(__id)
      .then((reservation) => {
         if (reservation) {
            reservation.set(req.body);
            return reservation
               .save()
               .then((reservation) => {
                  return res.status(200).json({ reservation });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "reservation not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-reservation/:id", (req,res, next) => {
   const __id = req.params.id;
   return ReserVation.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router