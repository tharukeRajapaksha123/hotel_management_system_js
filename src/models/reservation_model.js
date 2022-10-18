const mongoose = require("mongoose"); const Schema = mongoose.Schema;
const ReservationSchema = new Schema(
   {
      customer_name: { type: String, required: true },
      customer_id: { type: String, required: true },
      date: { type: Date, default: null, required: true },
      num_of_chairs: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Reservation", ReservationSchema)
