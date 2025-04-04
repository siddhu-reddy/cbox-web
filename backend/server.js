const express = require('express')
const mysql=require('mysql')
const cors = require('cors')
const bodyparser=require('body-parser')
const accountSid = 'ACa73eab1fa685dfafe0af0d995c679ddb';
const authToken = 'd2da03f9e6849b3e5503b68afd3878d2';
const client = require('twilio')(accountSid, authToken);

// client.verify.v2.services("VA6e05c6b1eaedd1a8d0736a1b47fccb2b")
//       .verificationChecks
//       .create({to: '+919755306553', code: '[Code]'})
//       .then(verification_check => console.log(verification_check.status));


const app=express()
app.use(express.json());
app.use(bodyparser.json())
app.use(cors())
const db = mysql.createPool({
    connectionLimit: 10, // Limit the number of connections
    host: "localhost",
    user: "root",
    password: "",
    database: "cbox"
});
app.get('/users',(req,res)=>{
    const sql="SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if(err)  return res.json(err);
        return res.json(data); 
    })
})

app.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    console.log(phone);
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP in a session (or database for real projects)
        req.session = { otp, phone };

        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            messagingServiceSid: "MGb8c6a63dca51193a30e471d77e384bd4",
            to: phone
        });

        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;

    if (req.session && req.session.otp === otp && req.session.phone === phone) {
        res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
});

app.listen(3000,()=>{
    console.log("listening");
})
