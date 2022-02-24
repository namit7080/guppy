const nodemailer= require('../config/nodemailer');

// this is another way
exports.newUser= (useremail,username)=>{
     //console.log("Inside new Coomment Mailer "+useremail);
     let html= nodemailer.renderTemplate({name:username},'/newUser.ejs')

     nodemailer.transporter.sendMail({
        from:'namitvedwan16@gmail.com',
        to:useremail,
        subject:"Welcome to the Code Gun Group",
        html:html


     },(err,info)=>{
        if(err)
        {
          //  console.log("Error in sedning mail " +err)
        }
       // console.log("Message Sent ",info);
        return;
     })
}