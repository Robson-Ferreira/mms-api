const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "thats work!"
    })
})

app.listen(port, () => {
    console.log('the server is running on port', port)
})