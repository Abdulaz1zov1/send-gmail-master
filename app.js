const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render('index')
});

app.post('/',(req,res)=>{
    const username = req.body.username;
    const file = req.body.file;
    const fromuser = req.body.fromuser;
    const userpass = req.body.userpass;
    const touser =req.body.touser;
    const content = req.body.content;

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:fromuser,
            pass:userpass
        }
    });
    
    let mailOptions = {
        from: fromuser,
        to: touser,
        text: content
    }
    
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log(err);
            res.send(`<h3>Quyidagi<a href="https://myaccount.google.com/lesssecureapps"> link </a>orqali emailingizdan xabar yuborish imkoniyatini tasdiqlang.</h3>`)
        } else {
            console.log('Successfully sended');
        res.redirect('/');
        }
    });


});

const PORT = process.env.PORT || 3000

app.listen(PORT,() => console.log(`Server is running ${PORT}-port`))