const mongoose = require('mongoose');

const doctorSchema =new mongoose.Schema({
name:{type:'string'},
specialist:{type:'string'},
location:{type:'string'},
contact:{type:'string'},
discription:{type:'string'},
images:[{ image:{type:'string'}}],
});

module.exports =mongoose.model("doctorList",doctorSchema);