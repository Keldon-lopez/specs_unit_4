// const dotenv = require('dotenv').config();
// const { CONNECTION_STRING } = process.env;
// const Sequelize = require('sequelize')
// const { QueryTypes } = require('sequelize');

// const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })

module.exports = {
    getAllPosts: (req, res) =>{
        console.log('getAllPost')
    }, 
    getCurrentUserPosts: (req, res) =>{
        console.log('getCurrentUserPosts')
    }, 
    addPost: (req, res) =>{
        console.log('addPost')
    }, 
    editPost: (req, res) =>{
        console.log('editPost')
    }, 
    deletePost: (req, res) =>{
        console.log('deletePost')
    }
}