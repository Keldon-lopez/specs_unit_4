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
    register: (req, res) => {
        console.log('register')
    },
    login: (req, res) =>{
        console.log('login')
    },
    logout: (req, res) => {
        console.log('logout')
    }
}