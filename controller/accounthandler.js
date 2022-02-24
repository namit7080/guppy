const User= require('../models/user');
const accountmail= require('../mailers/newUser');

// Created New User 
module.exports.create= function (req,res) {
    if(req.body.password!=req.body.confirmpassword){
        req.flash('error','Re-enter Password');
        return;
   }
   User.findOne({email: req.body.email},function (error,user) {
       // if user is not prensent in table
       if(!user){
          User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
          },function (error,user) {
              if(error){
                  console.log(" error while creating account");
              }
              else{
                   
                  req.flash('success','Account Created');
                  accountmail.newUser(req.body.email,req.body.name);
                  return res.redirect('/log-in');
              }
              
          })
          
       }

       else{
        res.redirect('back');
       }
  })



}

// Creating Session After Authentication
module.exports.createmySession= function (req,res) {
    req.flash('success','Log-In');
     return res.redirect('/');
     
 }

 // Destroy Session means Log Out
 module.exports.destroySession = function (req,res) {
    
    res.clearCookie('my_project');
    req.logout();
    console.log("Cookies Clear");
    req.flash('success','Log-out');
    return res.redirect('/'); 

 }

