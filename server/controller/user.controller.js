import User from "../models/user.model";
import dbErrorHanlder from '../helpers/dbErrorHanlder.js'
import { isConstructorDeclaration } from "typescript";



const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        return res.status(200).json({
            message: 'Successfully signed up!'
        })
    } catch (err) {
    
        return res.status(400).json({
            error: dbErrorHanlder.getErrorMessage(err)
        })
    }

}

const list = async (req, res) => {
    try {
        const users = User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status('400').json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    } catch (err) {
        res.status(400).json({
            error: dbErrorHanlder.getErrorMessage(err)
        })
    }

}
const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await User.findByIdAndDelete(user._id)
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        console.log('error remove')
        return res.status(400).json({
            error: err.message
        })
    }


}
const update = async (req, res) => {
    try {
        let user = req.profile
        extend(user, req.body)
        user.save()
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)

    } catch (err) {
        return res.status(401).json({
            error: err
        })
    }
}
const photo = async (req, res) => {

}

export default { remove,userByID, create, list, read, update }