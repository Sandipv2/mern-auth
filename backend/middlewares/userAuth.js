import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return res.json({success: false, message: 'Token Not Found'})
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(tokenDecoded.id) {
            req.body = {...req.body, userId: tokenDecoded.id}
        } else {
            return res.json({success: false, message: "Not Authorised. Login again"})
        } 

        next();

    } catch(err) {
        return res.json({success: false, message: err.message})
    }
}

export default userAuth