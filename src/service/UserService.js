const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

const createUser = (newUser) =>{
    return new Promise( async (resolve, reject) =>{
        const { name, email, password, confirmPassword, phone } = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser != null){
                resolve({
                    status: 'OK',
                    massage: 'The email already exist'
                })
            }
            const createdUser = await User.create({
                name,
                email,
                password, confirmPassword, phone
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'Your account is created',
                    data: createdUser
                })
            }
            
        } catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createUser
}