const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/product')

const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";     // make it hidden to unknown person will not know

const app = express();
app.use(express.json());
app.use(cors());

/// add jwt token at SignUp
app.post('/signup', async (req, res) => {
    let user = new User(req.body);        // take value from /signup page
    let result = await user.save();

    result = result.toObject();         // convert to object
    delete result.password;             // delete PW from object for response only

    /// pass result obj, hidden jwtKey, expired time 2 hrs, function().
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) res.send(err);

        res.send({ result, auth: token })      /// we pass result with unic jwt token
    })
    // res.send(result)
})

/// add jwt token at Login
app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {          /// if password & email will not give then not work

        let user = await User.findOne(req.body).select("-password")        // if we pass only name, provide all details with PW (If .select() not)
        {
            user ?
                (
                    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                        if (err) res.send(err);

                        res.send({ user, auth: token })
                    })
                    // res.send(user)
                )
                : res.send("Please Enter Correct Details")
        }

    } else {
        res.send("All Details are not Filled")
    }
})


app.post('/add',verifyToken, async (req, res) => {              // Add Products
    let product = new Product(req.body);      // use product collection
    let result = await product.save();
    res.send(result);
})


app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ Result: "No Products found" })
    }
})

app.delete('/product/:id', verifyToken, async (req, res) => {            /// Provide products id
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result);       // provide whole detail of given product id
    } else {
        res.send({ Result: "Data No Found." })
    }           /// after that go to postman
})

app.put('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },        // how will change
        { $set: req.body }             // set changes
    )
    res.send(result);
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let product = await Product.find({ name: { $regex: `^${req.params.key}`, $options: 'i' } })
    res.send(product)
})

/// MiddleWare
function verifyToken(req, res, next) {
    let token = req.header('authorization');
    if (token) {
        token = token.split(' ')[1];
        console.log("Middel Ware if ", token,jwtKey);

        /// please check postman Authorization you send
        jwt.verify(token, jwtKey, (err, valid) => {
            /// check postman Authoziation and localStorage auth both same from your self
            if (err) {
                res.status(403).send({Error: "Invalid Token"})
            } else {
                next();
            }
        })
    } else {
        res.status(401).send({ Result: "Please Add Token with header" });
    }
}

app.listen(5000, () => {
    console.log('server is running');
});