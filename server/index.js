const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000; 


const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());



const todoRoutes = require('./Routes/Todos');
const authRoutes = require('./Routes/Auth');
app.use('/api/v1/todos',todoRoutes);
app.use('/api/v1/auth',authRoutes);

app.listen(PORT,() => {
    console.log('app is listening on PORT',PORT);
});

const {dbConnect} = require('./Config/Database');
dbConnect();
