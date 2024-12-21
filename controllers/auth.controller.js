const userModel = require("../models/user.model")

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

const registerHandler = async (req, res) => {
    console.log("inside signup endpoint")
    const { name, address, phoneNo, email, password } = req.body;
    console.log("req.body-->", req.body)
    //name should have a have leaste theree charactere
    try {//validate username
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
        const userExist = await userModel.find({ email: email });
        console.log("users exist", userExist)
        if (!userExist) {
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
        console.log(e)
        return res.status(500).json({
            message: "sign in failed.Please try again later"
        })
    }
}
//login handler 
const loginHandler = async (req,res)=>
{
    const {email,password} = req.body;
    try{
    if(password.length < 8 && password.length>12)
    {
        return res.status(400).json({
            status:"error",
            data:{
                message:"Enter a valid password with at least 8 and not more than 12 characters"
            }
        })
    }

     const userExist  = userModel.find({email:email,password:password});

     if(!userExist)
     {
        return res.status(400).json({
            status:"error",
            data:{
                message:"icorrect username or password"
            }
            
        })
     }
     // Set cookie with username
    res.cookie('username', user.username, { httpOnly: true });

    return res.status(201).json({ message: 'Login successful.' });
       
    }
    catch(e)
    {
        return  res.status(500).json({
            status:"error",
            data:{
                message:"Signin falied.Please try again later"
            }
        })
    }
}

module.exports = { registerHandler ,loginHandler}
