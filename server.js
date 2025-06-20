import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import variableExamples from './modules/variableExamples.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/views', express.static('views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for views
app.get('/views/:page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', `${req.params.page}`));
});

// API endpoint for variable examples
app.get('/api/variables', (req, res) => {
  res.json(variableExamples);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
