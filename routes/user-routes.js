const express = require('express')
const router = express.Router()

const users = require('../users.js')

router.get('/users', (req, res) => {
    if (!users) {
        res.status(200).json({ success: true, msg: 'No users stored.' })
    }

    res.status(200).json({ success: true, data: users })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundUser = users.find(user => user.id === id)
    if (!foundUser) {
        return res.status(404).json({ success: false, msg: `User with id: ${id} cannot be found.` })
    }

    res.status(200).json({ success: true, data: foundUser });
})

router.post('/', (req, res) => {
    const newUser = req.body

    if (!newUser) {
        return res.status(400).json({ success: false, msg: `Error while posting request.` })
    }

    users.map(user => {
        if (user.id === newUser.id) return res.status(409).send('User already stored.')
    })

    users.push(newUser)
    res.status(200).json({ success: true, data: users })
})

router.put('/:id', (req, res) => {
    const putId = Number(req.params.id)
    const { username } = req.body

    if (!putId || !username) return res.status(400).json({ success: false, msg: '404 Bad Request' })

    const userExists = users.find(user => user.id === putId)
    if (userExists) {
        userExists.username = username
        return res.status(200).json({ success: true, data: users, msg: 'User replaced successfully!' });
    }

    users.push({ username, id: putId });
    res.status(200).json({ success: true, data: users });

})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundUser = users.find(user => user.id === id)

    if (!foundUser) {
        return res.status(404).send('404 User not found.')
    }

    const index = users.findIndex(user => user.id === id)
    if (index !== -1) users.splice(index, 1);

    res.status(200).json({ success: true, data: users, msg: 'User deleted successfully.' })
})

module.exports = router