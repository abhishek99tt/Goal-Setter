const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.port || 5000;
const Goal = require('./models/goalModel')

const connectDB = require('./config/db')
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})