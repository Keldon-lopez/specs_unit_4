require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {PORT} = process.env
const {register, login, logout} = require('./controllers/auth.js')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts.js')
const {isAuthenticated} = require('./middleware/isAuthenticated.js')

app.use(express.static(`${__dirname}/server`))

app.use(express.json())
app.use(cors())

// Auth
app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)

//Get all Posts
app.get('/posts', getAllPosts)


//AUTH Post usage
app.get('/userPosts/:userId', isAuthenticated, getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


app.listen(PORT, () => console.log(`up on ${PORT}`))