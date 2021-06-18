const jwt = require("jsonwebtoken")
const secret = "BudgetAPI109"

module.exports.createAccessToken = (user) => {

    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return jwt.sign(data,secret,{})

}

module.exports.verifyToken = (req,res,next) => {

    let token = req.headers.authorization
    if(typeof token === "undefined"){
        res.send({auth: "failed"})
    } else {
        token = token.slice(7,token.length)
        jwt.verify(token,secret, function(err,decoded){
            if(err){
                res.send({auth:"failed"})
            } else {
                req.user = decoded
                next()
            }
        })

    }

}
