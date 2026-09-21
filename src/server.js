const express = require('express');
const tasks = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use('/tasks', tasks);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Task API listening on http://localhost:${port}`));
