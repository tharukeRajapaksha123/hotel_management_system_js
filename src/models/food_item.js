const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema(
    {
       name: { type: String, required: true },
       price: { type: Number, required: true },
       available: { type: Number, required: true }
    }
    , {
       versionKey: false
    }
 )

 const FoodItem = mongoose.model("FoodItem",FoodItemSchema)
 module.exports = FoodItem