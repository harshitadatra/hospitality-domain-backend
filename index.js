const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const userModel = require("./db")

//register endpoint

app.post("/register", async (req, res) => {
    console.log("inside signup endpoint")
    const { name, address, phoneNo, email, password } = req.body;
    console.log("req.body-->", req.body)
    try {
        const newUser = {
            name: name,
            address: address,
            phoneNo: phoneNo,
            email: email,
            password: password
        }
        const user = await userModel.create(newUser);
        user.save();
        return res.status(200).json({
            message: "user added succesfully"

        })
    }
    catch (e) {
        return res.status(500).json({
            message: "sign in failed.Please try again later"
        })
    }
})

app.listen(PORT,()=>
{
 console.log(`app is listening on port ${PORT}`);
})
