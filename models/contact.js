const mongoose=require('mongoose');//uses same instance as of previously used mongoose instance

const contactSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    }
    //objectid is created automatically
});
const Contact=mongoose.model('contact',contactSchema);//name of collection
module.exports=Contact;
