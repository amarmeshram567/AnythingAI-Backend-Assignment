require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db");
const helmet = require('helmet');
const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express()


connectDB()



app.use(express.json())
app.use(helmet())
app.use(cors(
    {
        origin: true,
        credentials: true
    }

))



const port = process.env.PORT || 5000


app.get("/", (req, res) => {
    res.send("Server Running")
})


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter)



app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})



module.exports = app

