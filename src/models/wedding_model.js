const mongoose = require("mongoose"); const Schema = mongoose.Schema;

const WeddingSchema = new Schema(
   {
      customer_id: { type: String, required: true },
      customer_name: { type: String, required: true },
      customer_email: { type: String, required: true },
      wedding_location: { type: String, required: true },
      num_of_guests: { type: String, required: true },
      date: { type: String, required: true },
      hall_type : {type:String,required : true}
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Wedding", WeddingSchema)