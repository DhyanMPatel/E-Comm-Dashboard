const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/product')

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    let user = new User(req.body);        // take value from /signup page
    let result = await user.save();

    result = result.toObject();         // convert to object
    delete result.password;             // delete PW from object for response only

    res.send(result);
})

app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {          /// if password & email will not give then not work

        let user = await User.findOne(req.body).select("-password")        // if we pass only name, provide all details with PW (If .select() not)
        { user ? res.send(user) : res.send("Please Enter Correct Details") }

    } else {
        res.send("All Details are not Filled")
    }
})


app.post('/add', async (req, res) => {              // Add Products
    let product = new Product(req.body);      // use product collection
    let result = await product.save();
    res.send(result);
})


app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ Result: "No Products found" })
    }
})

app.delete('/product/:id', async (req, res) => {            /// Provide products id
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get('/product/:id', async (req, res) => {
    let result = await Product.findOne({ _id:req.params.id })
    if (result) {
        res.send(result);
    } else {
        res.send({Result:"Data No Found."})
    }           /// after that go to postman
})

app.listen(5000, () => {
    console.log('server is running');
});