const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

require('./routes/dialogFlowRoutes')(app)
require('./models')(app);

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})