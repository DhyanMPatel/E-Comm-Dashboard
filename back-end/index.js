const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);        // take value from /signup page
    let result = await user.save();

    result = result.toObject();         // convert to object
    delete result.password;             // delete PW from object for response only

    res.send(result);
})
 
app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {          /// if password & email will not give then not work

        const user = await User.findOne(req.body).select("-password")        // if we pass only name, provide all details with PW (If .select() not)
        { user ? res.send(user) : res.send("Please Enter Correct Details") }

    } else {
        res.send("All Details are not Filled")
    }
})

app.listen(5000, () => {
    console.log('server is running');
});