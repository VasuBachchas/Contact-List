var mongoose =require('mongoose');//require the library
mongoose.connect('mongodb://localhost/contact_list_db');//connect to server
const db=mongoose.connection;//acquire the connection
db.on('error',console.error.bind(console,'error connecting to bd'));//error
db.once('open',function(){
    console.log('successfully connected to db');
});