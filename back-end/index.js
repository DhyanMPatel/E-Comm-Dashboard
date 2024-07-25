const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup',async(req,res)=>{
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
})

app.listen(5000,()=>{
    console.log('server is running');
});