const express = require('express')
const router = express.Router()

const users = require('../users.js')
const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controller/controller.js')

router.get('/users', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

module.exports = router