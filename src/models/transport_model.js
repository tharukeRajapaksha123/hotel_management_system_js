const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const TransportTourSchema = new Schema(
   {
      vehicle_id: { type: String, required: true },
      customer_id: { type: String, required: true },
      date: { type: Date, required: true },
      employee_id: { type: String, required: false }
   }
   , {
      versionKey: false
   }
)

module.exports = mongoose.model("TransportTour", TransportTourSchema)