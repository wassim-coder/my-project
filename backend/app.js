const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

module.exports = app;
