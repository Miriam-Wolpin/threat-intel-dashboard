require('dotenv').config();
const express = require('express');
const cors = require('cors');
const intelRouter = require('./src/routes/intel');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/intel', intelRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
