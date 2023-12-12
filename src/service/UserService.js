const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

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
            const hash = await bcrypt.hash(password.toString(), 10)
            const createdUser = await User.create({
                name,
                email,
                password : hash, 
                phone
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

const loginUser = (userLogin) =>{
    return new Promise( async (resolve, reject) =>{
        const {email, password} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser == null){
                resolve({
                    status: 'OK',
                    massage: 'Email or Password not correct'
                })
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password)
            if(!comparePassword){
                resolve({
                    status: 'OK',
                    massage: 'Email or Password not correct'
                })
            }
            const access_token =  await generalAccessToken({
                id : checkUser.id,
                isAdmin : checkUser.isAdmin
            })
            
            const refresh_token = await generalRefreshToken({
                id : checkUser.id,
                isAdmin : checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                massage: 'Login success',
                access_token,
                refresh_token
            })
        } catch(e){
            reject(e)
        }
    })
}

const updateUser = (id, data) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            
            if(checkUser == null){
                resolve({
                    status: 'OK',
                    massage: 'User not exist'
                })
            }
            const updatedUser = await User.findOneAndUpdate(checkUser._id, data)
            resolve({
                status: 'OK',
                massage: 'Update user success',
                data: updateUser
            })
        } catch(e){
            reject(e)
        }
    })
}

const deleteUser = (id) =>{ //Disable
    return new Promise( async (resolve, reject) =>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            
            if(checkUser == null){
                resolve({
                    status: 'OK',
                    massage: 'User not exist'
                })
            }
            //await User.findOneAndDelete(checkUser._id)
            resolve({
                status: 'OK',
                massage: 'Delete user success',
            })
        } catch(e){
            reject(e)
        }
    })
}

const getAllUser = () =>{
    return new Promise( async (resolve, reject) =>{
        try{           
            const allUser = await User.find()
            resolve({
                status: 'OK',
                massage: 'Get all user success',
                data : allUser
            })
        } catch(e){
            reject(e)
        }
    })
}

const getDetailsUser = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try{           
            const detailsUser = await User.findOne({
                _id : id
            })
            console.log(detailsUser)
            if(detailsUser == null){
                resolve({
                    status: 'OK',
                    massage: 'User not exist',
                })
            }
            resolve({
                status: 'OK',
                massage: 'Get details user success',
                data : detailsUser
            })
        } catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}