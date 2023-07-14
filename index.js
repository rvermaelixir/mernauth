const express = require('express')
const connectDB = require('./config/db')
const v1Api = require('./routes/api/v1/index')
const app = express()
const PORT = process.env.port || 8001
connectDB()
const cors = require('cors')
app.use(express.json({extended: false}))
app.use(cors({
    origin: '*'
}));
app.get("/", (_, res) => {
    res.send("Welcome to petguest")
})

app.use("/api/v1", v1Api)

app.listen(PORT, () => {
    console.log("server started in http://localhost:8001`")
})