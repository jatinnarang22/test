const express=require('express');
const path=require('path');
const port=8000;
 
const db=require('./config/mongoose')
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); 
app.use(express.urlencoded());
app.use(express.static('assets')); 
// //middleware1
// app.use(function(req,res,next){
//     req.myName="Jatin"
//     // console.log('middleware 1 called');
//     next();
// })
// //middleware2
// app.use(function(req,res,next){
//     console.log('myName from MW2',req.myName);
//     // console.log('middleware 2 called');
//     next();
// })

var contactList=[
    {
        name: "Arpan",
        phone: "11111111"
    },
    {
        name: "Tony Stark",
        phone: "123234134234"
    },
    {
        name: "Jatin Narang",
        phone: "939234249213"
    }
]
app.get('/',function(req,res){
    console.log(req.myName)
    return res.render('home' , {
        title:"Contact list",
        contact_list: contactList 
    }
    );
});
app.get('/practice',function(req,res){
    
    return res.render('practice' , {
        title:"Let us play with ejs"
    }
    )
})
app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    //     contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    contactList.push(req.body);

    return res.redirect('/');
})
//query perameters ,string perameters
// for deleting a contact
app.get('/delete-contact/',function(req,res){

    // get the query from the url
    // console.log(req.query);
    let phone=req.query.phone;

    let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('/');

})

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My Express server is running on Port:',port);
})