const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('cliente', {
    nome: {
        type: DataTypes.STRING(99)
    },
    email: {
        type: DataTypes.STRING(99)
    },
    senha: {
        type: DataTypes.STRING(40)
    }
},{
    createdAt: false,
    updatedAt: false
})

// Cliente.sync({force:true})
module.exports = Cliente