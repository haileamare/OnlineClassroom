import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { expressjwt as expressjwt } from 'express-jwt'
import config from './../../config/config'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email });
        
        if (!user) {
            return res.status(401).json({
                error: 'User not found with that email'
            });
        }

        if (!user.authenticate(req.body.password)) {
            console.log('false',req.body.passw)
            return res.status(401).json({
                error: "Password does not match"
            });
        }

        let token = jwt.sign({ _id: user._id }, config.jwtSecret, { algorithm: 'HS256' });
        res.cookie('t', token, { expire: new Date(Date.now() + 9999) });
        console.log("token",token)
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                educator:user.educator
            },
            token:token
        });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "Signed out"
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty:'auth'
    
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: "user is not authorized"
        })
    }
    next()
}
export default { requireSignin, signout, signin, hasAuthorization } 