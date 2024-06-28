const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log("jsonwenbtoken:",req.headers.authorization)
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.seckey, (err, user) => {
            if (err) res.status(401).json("token is not vailed")
            console.log("user:",user)
        if(user.id===req.params.id){
            next();
        }else{
            console.log('your id and token missmatch')
            return res.status(403).json('your id and token missmatch')

        }

        })
    }else{
        return res.status(401).json("youjare not authorised")
    }
}
module.exports=(verifyToken) 