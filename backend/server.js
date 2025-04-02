const express = require('express')
const mysql=require('mysql')
const cors = require('cors')

const app=express()
app.use(express.json());
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


app.listen(3000,()=>{
    console.log("listening");
})
