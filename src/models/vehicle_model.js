const mongoose = require("mongoose"); const Schema = mongoose.Schema;

const VehicleSchema = new Schema(
   {
      brand: { type: String, required: true },
      num_of_seats: { type: Number, required: true },
      registration_number: { type: String, required: true },
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Vehicle", VehicleSchema)