const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);
var step = new Schema({
    location: String,
},{"_id": false})
var travellerSchema = new Schema({
    _id: Number,
    plane_no: String,
    departure_date: String,
    arrival_date: String,
    passport_no: String,
    traveller_name: String,
    luggage_name: String,
    luggage_information: String,
    luggage_new_status: String,
    luggage_prev_status: String,
    luggage_condition: String,
    checkin: String,
    checkout: String,
    journey_stop: [step],
    },
    //timestamp : { type: Date, required: true, default: Date.now }
    { timestamps: { createdAt: 'created_at' } 
   },{
       versionKey: false,
   });
travellerSchema.plugin(autoIncrement.plugin, 'trackntraces');
//create model
const User = mongoose.model("trackntrace", travellerSchema);
module.exports = {
    traveller: User
};