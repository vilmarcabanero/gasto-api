const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

// connect to database
require('./db')

app.use('/api/users', require('./routes/users'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/entries', require('./routes/entries'))

app.listen(port , () =>{
    console.log(`Server running on port ${port}`)
})