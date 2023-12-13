const User = require("../models/UserModel")
const Product = require('../models/ProductModel')

const createProduct = (newProduct) =>{
    return new Promise( async (resolve, reject) =>{
        try{         
            const {name, image, type, price, countInStock, rating, description} = newProduct 
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Product is already exist'
                })
            }
            
            const createdProduct = await Product.create({
                name, image, type, price, countInStock, rating, description
                })

            resolve({
                status: 'OK',
                massage: 'Product created',
                data : createdProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id, data) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            const updatedProduct = await Product.findOneAndUpdate(checkProduct._id, data, {new :true})
            resolve({
                status: 'OK',
                massage: 'Update product success',
                data: updatedProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            const deletedProduct = await Product.findOneAndDelete(checkProduct._id)
            resolve({
                status: 'OK',
                massage: 'product is deleted',
                data: deletedProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const getAllProduct = () =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const productData = await Product.find()
            resolve({
                status: 'OK',
                massage: 'SUCCESS',
                data: productData
            })
        } catch(e){
            reject(e)
        }
    })
}

const getProductById = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            resolve({
                status: 'OK',
                massage: 'product is deleted',
                data: checkProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const getProductByType = (type) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.find({
                type: type
            })
            console.log(checkProduct)
            if(checkProduct.length === 0){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            resolve({
                status: 'OK',
                massage: 'Get success',
                data: checkProduct
            })
        } catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    getProductByType
}