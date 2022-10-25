const mongoose = require("mongoose"); const Schema = mongoose.Schema;
const RoomSchema = new Schema(
   {
      type: { type: String, required: true },
      facilities: { type: String, required: true },
      cost_per_day: { type: Number, required: true },
      no_of_beds: { type: Number, default: null, required: true },
      image_url: { type: String, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Rooms", RoomSchema)
