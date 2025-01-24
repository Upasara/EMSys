import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import dbConnection from './db/db.js'


dbConnection()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(process.eventNames.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})