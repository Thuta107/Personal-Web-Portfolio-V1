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
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
          
        let mailOptions = {
            from: `Message from ${req.body.email} <${req.body.email}>`,
            to: process.env.EMAIL,
            subject: req.body.subject,
            text: req.body.message
        };
          
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(`Error: ${error}`)
                res.status(400).json(error)
            } else {
                console.log("Message is sent successfully")
                res.status(200).json("Thank you! Your message is sent successfully.");
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