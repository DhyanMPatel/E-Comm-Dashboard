const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-comm-dashboard')
.then(()=>{
    console.log("Connected")
}).catch(()=>{
    console.log("Not Connected")
})