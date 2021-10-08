const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Set static folder (return web page upon load)
app.use(express.static(path.join(path.join(__dirname, 'public'))));
app.use('/doc', express.static(path.join(path.join(__dirname, 'doc'))));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(express.json())

// Contact Form Submission
app.post("/", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'thutalin1727@gmail.com',
            pass: 'Thutalinn1998'
        }
    });
      
    let mailOptions = {
        from: `${req.body.fullname} from ${req.body.email} <${req.body.email}>`,
        to: 'thutalin1727@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };
      
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            // res.status(400).json({msg: "Sorry! Error occured when sending a message."})
            console.log(`Error: ${error}`)
            res.status(400).json({msg: "Sorry! Error occured when sending a message."})
        } else {
            // res.status(200).json({msg: "Thank you! Your message is sent successfully."});
            console.log("Message is sent successfully")
            res.status(200).json({msg: "Thank you! Your message is sent successfully."});
        }
    });
})

// Listen to server
app.listen(PORT, () => console.log(`Server initiated on port ${PORT}.`));