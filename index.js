const express=require('express');
const port=8000;
const path=require('path');

const db=require('./config/mongoose');
const Contact=require('./models/contact');//collection or model or table

const app=express();//to get all the functinalities of express

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());//to set up our middleware which takes input(req),res and from browser the data //and create entry in req object in body key and it passes data to controller. it reads only form data not the params

app.use(express.static('assets'));//to load our css,js,images on webpages linking these files(static files)

var contactlist=[
    {name:"vasu",
    phone:"123456576"},
    {name:"abcd",
    phone:"121324324"},
    {name:"sad",
    phone:"1256576"},

];
//controller
app.get('/ab',function(req,res){//type of requests=get,post,delete,put

    Contact.find({},function(err,contacts){//to retrieve data from database
        if(err){
            console.log('error in fetching contacts');
            return;
        }
        return res.render('home',{title:'Contact list',
                                    contact_list:contacts});

    })

    //return res.render('home',{title:'Contact list',
      //                          contact_list:contactlist});
});


app.get('/delete-contact/:id',function(req,res){
    var id=req.params.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    });
    //console.log(req.params.phone);
    //for(var i=0;i<contactlist.length;i++){
      //  if(contactlist[i].phone==req.params.phone){
        //    var j=i;
          //  break;
        //}
    

    //contactlist.splice(j,1);
    //return res.redirect('/ab');
});
app.post('/create-contact',function(req,res){//to handle a post request from browser
    //contactlist.push(req.body);
    Contact.create({//to send the data in contact colection
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        console.log("*******",newContact);
        return res.redirect('back');
    });
    //return res.redirect('/ab');//again goes back to the previous page
});
app.listen(port,function(err){
    if(err) {
        console.log(err);
    }
    console.log('server is running on port',port);
});