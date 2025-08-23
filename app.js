const express = require('express')
const app = express()

const users = require('./users.js')
const usersRouter = require('./routes/user-routes.js')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/postman', usersRouter)

app.get('/', (req, res) => {
    console.log(users)
    res.send('Testing')
})

app.listen(5000, () => {
    console.log('Listening on port 5000...');
})