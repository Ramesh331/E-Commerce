const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()
require("dotenv").config()
connectDatabase()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//routes here
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")

// test api to check if server is live
app.get("/",(req,res)=>{
    res.status(200).json({
        message : "This is working"
    })
})

app.use("/api",authRoute)
app.use("/api",productRoute)


// listen server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})