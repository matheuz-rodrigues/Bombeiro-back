const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const userRoutes = require('./routes/user');
const ocorrenciaRoutes = require('./routes/ocorrencia');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/ocorrencias', ocorrenciaRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get((req, res) => {
  res.status(404).send({ message: 'Route Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});