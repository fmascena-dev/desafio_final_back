require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shelterRoutes = require('./routes/shelterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/shelters', shelterRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
