const router = require('express').Router();
const AdminData = require('../Models/Admin');
const crypto = require('crypto-js');
const JWT = require('jsonwebtoken');
const UserData = require('../Models/SignupSchema');



router.post('/signup', async (req, res) => {
    console.log(req.body);
    req.body.password = crypto.AES.encrypt(req.body.password, process.env.Passkey).toString();
    try {
        const NewUser = new AdminData(req.body);
        await NewUser.save();
        res.status(200).json("success");
    } catch (err) {
        console.error("Error during user signup:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const FindUser = await AdminData.findOne({ email: req.body.email });
        if (!FindUser) return res.status(401).json('Invalid email or password');

        const bytes = crypto.AES.decrypt(FindUser.password, process.env.Passkey);
        const originalPassword = bytes.toString(crypto.enc.Utf8);

        if (req.body.password !== originalPassword) return res.status(401).json('Invalid email or password');

        const Token = JWT.sign({ id: FindUser._id }, process.env.seckey, { expiresIn: '100d' });
        console.log("token:", Token);
        res.status(200).json({ Token, id: FindUser._id });
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.get("/allUsers", async (req, res) => {
    try {
        const datas = await UserData.find()
        console.log(datas.data)
        res.status(200).json(datas)
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})
router.delete('/removeUser/:id',async(req,res)=>{
    try{
        await UserData.findByIdAndDelete(req.params.id)
    }catch(err){
        res.status(500).json({ message: "Internal Server Error", error: err.message })
    }
})


module.exports = router;