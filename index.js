const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set static folder (return web page upon load)
app.use(express.static(path.join(path.join(__dirname, 'public'))));
app.use('/doc', express.static(path.join(path.join(__dirname, 'doc'))));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(express.json())

// Contact Form Submission
app.post("/", (req, res) => {
      
    try {

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
          
        let mailOptions = {
            from: req.body.email,
            to: process.env.EMAIL,
            subject: req.body.subject,
            text: req.body.message
        };
          
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.status(500).json(false)
            } else {
                res.status(200).json(true);
            }
        });

    } catch(e) {
        console.log(e)
    }
})

// Listen to server
app.listen(PORT, () => {
    console.log(`Server initiated on port ${PORT}.`)
});