const mongoose = require('mongoose');

const appointmentSchema =new mongoose.Schema({
email:{type:'string'},
doctor:{type:'string'},
specialist:{type:'string'},
status:{type:'string'},

});

module.exports =mongoose.model("appointments",appointmentSchema);