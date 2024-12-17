const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const userModel = require("./db")

const validateEmail = (email) => {
    console.log("inside validate email")
    if (!email.includes('@') || !email.includes('.'))
        return false;
    if (email.split('@').length !== 2)
        return false

    const [localPart, domainPart] = email.split('@');
    if (!localPart || !domainPart)
        return false;

    const domainParts = domainPart.split('.');
    console.log("domain parts-->", domainParts)
    if (domainParts.length < 2)
        return false;
    const domainExtension = domainParts[domainParts.length - 1]
    console.log("domainextension", domainExtension)
    if (domainExtension.length < 2)
        return false;
    return true;

}

//register endpoint

app.post("/register", async (req, res) => {
    console.log("inside signup endpoint")
    const { name, address, phoneNo, email, password } = req.body;
    console.log("req.body-->", req.body)
    //name should have a have leaste theree charactere
    try {

        //validate username
        if (name.length < 3) {
            return res.status(400).json({
                status: "error",
                data: {
                    message: "Enter a valid name with atleast three characters"
                }
            })

        }
        //validate phone number.
        if (phoneNo.length < 10) {
            return res.status(400).json({
                status: "error",
                data: {
                    message: "Enter a valid phone no with 10 digits"
                }
            })
        }

        //validate email
        if (!validateEmail(email)) {
            return res.status(400).json({
                status: "error",
                data: {
                    message: "Enter a valid email id"
                }
            })
        }
      //validate user
     const userExist = await userModel.findOne({ email: email });
        console.log("users exist", userExist)
        if (userExist) {
            return res.status(400).json({
                status: "error",
                data: {
                    message: "user alaready exist with thsi email id"
                }
            })
        }
        else {
            //validate password
            if (password.length < 8 && password.length > 12) {
                return res.status(200).json({
                    status: "error",
                    data: {
                        message: "Enter a valid password with at least 8 and not more than 12 characters."
                    }

                })
            }
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
    }
    catch (e) {
        return res.status(500).json({
            message: "sign in failed.Please try again later"
        })
    }
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
