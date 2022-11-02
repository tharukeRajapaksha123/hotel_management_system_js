const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const TransportTourSchema = new Schema(
   {
      vehicle_type: { type: String, required: true },
      customer_name: { type: String, required: true },
      location_address: { type: String, required: true },
      mobile_number: { type: String, required: true },
      date: { type: Date, required: true },
      employee_id: { type: String, required: false }
   }
   , {
      versionKey: false
   }
)

module.exports = mongoose.model("TransportTour", TransportTourSchema)